package com.shopease.marketplace.bootstrap;

import com.shopease.marketplace.entity.Product;
import com.shopease.marketplace.entity.User;
import com.shopease.marketplace.repository.ProductRepository;
import com.shopease.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
            List<Product> products = new ArrayList<>();

            products.add(new Product("SonicMaster Studio Pro Gen II", "Studio Tech", new BigDecimal("299.00"), 10, "/sonicmaster.png", "High-fidelity wireless studio headphones featuring active noise cancellation and premium comfort.", "Electronics"));
            products.add(new Product("Core Series 04 Smart Hub", "Core", new BigDecimal("450.00"), 5, "/watch.png", "Limited edition smartwatch crafted from aerospace-grade titanium and sapphire crystal.", "Fashion"));
            products.add(new Product("Lumina Classic Edition Cam", "Lumina", new BigDecimal("1199.95"), 2, "/camera.png", "Vintage inspired digital camera with a full-frame sensor.", "Electronics"));
            products.add(new Product("AeroStride Performance Runners", "Aero", new BigDecimal("185.00"), 20, "/shoes.png", "Ultra lightweight performance running shoes.", "Fashion"));
            products.add(new Product("Zenith Pro 12.9\" Workspace", "Zenith", new BigDecimal("899.00"), 15, "/tablet.png", "Ultimate tablet for digital artists and professionals.", "Electronics"));
            products.add(new Product("VistaBeam 4K Curved Display", "Vista", new BigDecimal("675.00"), 8, "/monitor.png", "Immersive curved monitor for uncompromised productivity.", "Electronics"));

            // 20 New Products
            // ELECTRONICS (6)
            products.add(new Product("EchoBass TWS Buds", "Echo", new BigDecimal("89.50"), 45, "/earbuds.png", "Compact true wireless earbuds with punchy bass.", "Electronics"));
            products.add(new Product("SonicPro Zen ANC", "SonicPro", new BigDecimal("199.00"), 12, "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600", "Over-ear noise cancelling headphones.", "Electronics"));
            products.add(new Product("NeoMechanic X1 Keyboard", "Neo", new BigDecimal("145.00"), 30, "/keyboard.png", "RGB mechanical gaming keyboard with silent tactile switches.", "Electronics"));
            products.add(new Product("HyperGlide Gaming Mouse", "Hyper", new BigDecimal("59.99"), 50, "/mouse.png", "Ultra-lightweight esports gaming mouse.", "Electronics"));
            products.add(new Product("Aurora Cast Microphone", "Aurora", new BigDecimal("129.00"), 18, "/mic.png", "Studio condenser microphone for streaming and podcasting.", "Electronics"));
            products.add(new Product("LensMaster 50mm Prime", "LensMaster", new BigDecimal("349.00"), 9, "/lens.png", "Nifty fifty prime lens with beautiful bokeh.", "Electronics"));

            // FASHION (7)
            products.add(new Product("Midnight Silk Tie", "Vanguard", new BigDecimal("45.00"), 25, "/tie.png", "Premium silk tie in midnight blue.", "Fashion"));
            products.add(new Product("Classic Leather Oxford", "Heritage", new BigDecimal("165.00"), 14, "/oxford.png", "Handcrafted leather formal shoes.", "Fashion"));
            products.add(new Product("Urban Aviator Sunglasses", "Aero", new BigDecimal("85.00"), 40, "/aviator.png", "Classic polarized aviators with gold frames.", "Fashion"));
            products.add(new Product("Alabaster Essential Watch", "Chronos", new BigDecimal("249.00"), 14, "/classic_watch.png", "Minimalist surgical-steel watch with Italian leather strap.", "Fashion"));
            products.add(new Product("Merino Wool Scarf", "Loom", new BigDecimal("55.00"), 60, "/scarf.png", "Ultra-soft premium merino wool winter scarf.", "Fashion"));
            products.add(new Product("Nomad Canvas Backpack", "Trail", new BigDecimal("110.00"), 22, "/backpack.png", "Durable waxed canvas daypack.", "Fashion"));
            products.add(new Product("Onyx Cufflinks", "Vanguard", new BigDecimal("75.00"), 10, "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600", "Sterling silver cufflinks with embedded onyx stones.", "Fashion"));

            // HOME & GARDEN (7)
            products.add(new Product("Monstera Deliciosa Plant", "Botany", new BigDecimal("45.00"), 35, "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600", "Lush indoor Swiss Cheese plant in ceramic pot.", "Home & Garden"));
            products.add(new Product("Brass Pour-Over Kettle", "Brew", new BigDecimal("65.00"), 18, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600", "Gooseneck coffee kettle with built-in thermometer.", "Home & Garden"));
            products.add(new Product("Minimalist Desk Lamp", "Lumina", new BigDecimal("89.00"), 25, "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600", "Brushed metal adjustable LED reading lamp.", "Home & Garden"));
            products.add(new Product("Ceramic Espresso Cups", "Artisan", new BigDecimal("32.00"), 50, "/ceramic_espresso_cups.png", "Set of two handcrafted ceramic espresso cups.", "Home & Garden"));
            products.add(new Product("Organic Cotton Throw", "Haven", new BigDecimal("65.00"), 40, "/organic_cotton_throw.png", "Cozy, breathable organic cotton throw blanket.", "Home & Garden"));
            products.add(new Product("Eucalyptus Scented Candle", "Aura", new BigDecimal("28.00"), 75, "/eucalyptus_scented_candle.png", "Hand-poured soy wax candle with botanical scents.", "Home & Garden"));
            products.add(new Product("Terrazzo Plant Stand", "Stone", new BigDecimal("120.00"), 5, "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600", "Mid-century modern terrazzo pedestal stand.", "Home & Garden"));

            productRepository.saveAll(products);
        }
    }
}
