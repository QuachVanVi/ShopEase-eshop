package com.curated.marketplace.bootstrap;

import com.curated.marketplace.entity.Product;
import com.curated.marketplace.entity.User;
import com.curated.marketplace.repository.ProductRepository;
import com.curated.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DummyDataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User("admin", passwordEncoder.encode("admin"), "ADMIN");
            User user = new User("user", passwordEncoder.encode("password"), "USER");
            userRepository.saveAll(Arrays.asList(admin, user));
        }

        if (productRepository.count() == 0) {
            Product p1 = new Product(
                "SonicMaster Studio Pro Gen II",
                "Studio Tech",
                new BigDecimal("299.00"),
                10,
                "https://images.unsplash.com/photo-1546435770-a3e426fac365?auto=format&fit=crop&q=80&w=600",
                "High-fidelity wireless studio headphones featuring active noise cancellation and premium comfort."
            );
            Product p2 = new Product(
                "Core Series 04 Smart Hub",
                "Core",
                new BigDecimal("450.00"),
                5,
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
                "Limited edition smartwatch crafted from aerospace-grade titanium and sapphire crystal."
            );
            Product p3 = new Product(
                "Lumina Classic Edition Cam",
                "Lumina",
                new BigDecimal("1199.95"),
                2,
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
                "Vintage inspired digital camera with a full-frame sensor."
            );
            Product p4 = new Product(
                "AeroStride Performance Runners",
                "Aero",
                new BigDecimal("185.00"),
                20,
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
                "Ultra lightweight performance running shoes."
            );
            Product p5 = new Product(
                "Zenith Pro 12.9\" Workspace",
                "Zenith",
                new BigDecimal("899.00"),
                15,
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
                "Ultimate tablet for digital artists and professionals."
            );
            Product p6 = new Product(
                "VistaBeam 4K Curved Display",
                "Vista",
                new BigDecimal("675.00"),
                8,
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600",
                "Immersive curved monitor for uncompromised productivity."
            );

            productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6));
        }
    }
}
