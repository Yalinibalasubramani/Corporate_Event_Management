package com.example.demo.controller;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Signup;
import com.example.demo.repository.SignupRepo;
import com.nimbusds.jose.jwk.source.ImmutableSecret;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class SignupController {

    @Autowired
    private SignupRepo repository;

    private final AuthenticationManager authenticationManager;

    @Value("${security.jwt.secret-key}")
    private String jwtSecretKey;

    @Value("${security.jwt.issuer}")
    private String jwtIssuer;

    @Autowired
    public SignupController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
public ResponseEntity<Object> registerUser(@Valid @RequestBody Signup registerDto, BindingResult result) {
    if (result.hasErrors()) {
        Map<String, String> errorsMap = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            errorsMap.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errorsMap);
    }

    BCryptPasswordEncoder bCryptEncoder = new BCryptPasswordEncoder();
    Signup userModel = new Signup();
    
    userModel.setUsername(registerDto.getUsername());
    userModel.setEmail(registerDto.getEmail());
    userModel.setPassword(bCryptEncoder.encode(registerDto.getPassword()));
    userModel.setMobile(registerDto.getMobile());
    userModel.setRole(registerDto.getRole());

    try {
        if (repository.existsByEmail(registerDto.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        repository.save(userModel);

        String jwtToken = createJwtToken(userModel);
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("user", userModel);
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration");
    }
}

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@Valid @RequestBody Signup loginDto, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorsMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorsMap.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errorsMap);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
            Signup userModel = repository.findByEmail(loginDto.getEmail());

            String jwtToken = createJwtToken(userModel);
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("user", userModel);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad email or password");
        }
    }
     
    @GetMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestParam String email, @RequestParam String password,
            @RequestParam String role) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            Signup userModel = repository.findByEmail(email);

            String jwtToken = createJwtToken(userModel);

            var response = new HashMap<String, Object>();
            response.put("token", jwtToken);
            response.put("user", userModel);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad username or password");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Signup> getUserById(@PathVariable Long id) {
        return repository.findById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    private String createJwtToken(Signup userModel) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(24 * 3600)) // 24 hours expiry
                .subject(userModel.getUsername())
                .claim("role", userModel.getRole()) // Add role to the JWT claims
                .build();

        var encoder = new NimbusJwtEncoder(new ImmutableSecret<>(jwtSecretKey.getBytes()));

        var params = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims);

        return encoder.encode(params).getTokenValue();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    return repository.findById(id).map(user -> {
        if ("Organizer".equalsIgnoreCase(user.getRole())) {
            repository.delete(user);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete organizers");
        }
    }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
}
@GetMapping("/get")
public List<Signup> getAllUsers() {
    return repository.findAll();
}

}
