import { prisma } from "@/lib/prisma";
const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    imageUrl: "🎧",
    rating: 4.8,
    reviews: 245,
    category: "Audio",
    description:
      "Crystal clear sound with active noise cancellation. 30-hour battery life, Bluetooth 5.0, and premium comfort padding for all-day wear.",
  },
  {
    id: 2,
    name: "Smart Watch Ultra",
    price: 249.99,
    imageUrl: "⌚",
    rating: 4.9,
    reviews: 512,
    category: "Wearables",
    description:
      "Advanced fitness tracking with heart rate monitor, GPS, blood oxygen sensor. 7-day battery, 50m water resistance, and 100+ watch faces.",
  },
  {
    id: 3,
    name: "USB-C Cable Pro",
    price: 19.99,
    imageUrl: "🔌",
    rating: 4.7,
    reviews: 1203,
    category: "Cables & Chargers",
    description:
      "Durable braided nylon cable with 100W power delivery. Fast charging for laptops, phones, and tablets. Lifetime warranty included.",
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 49.99,
    imageUrl: "🔋",
    rating: 4.6,
    reviews: 845,
    category: "Power & Charging",
    description:
      "20000mAh capacity with dual USB and USB-C ports. Charges 3 phones per cycle. Compact design with LED display.",
  },
  {
    id: 5,
    name: "4K Webcam Pro",
    price: 199.99,
    imageUrl: "📹",
    rating: 4.7,
    reviews: 432,
    category: "Electronics",
    description:
      "4K resolution at 30fps with auto-focus. Built-in mic, wide 90° field of view. Perfect for streaming and professional meetings.",
  },
  {
    id: 6,
    name: "Mechanical Keyboard RGB",
    price: 159.99,
    imageUrl: "⌨️",
    rating: 4.9,
    reviews: 1856,
    category: "Computing",
    description:
      "Cherry MX mechanical switches, RGB backlighting, programmable keys. Aluminum frame with USB-C connection and 2000Hz polling rate.",
  },
  {
    id: 7,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    imageUrl: "🖱️",
    rating: 4.8,
    reviews: 923,
    category: "Computing",
    description:
      "12000 DPI sensor with 100-hour battery life. Ergonomic design, 6 programmable buttons, and 1ms response time.",
  },
  {
    id: 8,
    name: "LED Ring Light",
    price: 39.99,
    imageUrl: "💡",
    rating: 4.6,
    reviews: 567,
    category: "Lighting",
    description:
      "10-inch ring light with adjustable brightness and color temperature. Perfect for content creation, makeup, and photography.",
  },
  {
    id: 9,
    name: "Bluetooth Speaker Mini",
    price: 44.99,
    imageUrl: "🔊",
    rating: 4.7,
    reviews: 678,
    category: "Audio",
    description:
      "Portable 360° sound with 12-hour battery. Waterproof IPX7 rated, built-in microphone for calls, and deep bass.",
  },
  {
    id: 10,
    name: "Noise Canceling Earbuds",
    price: 149.99,
    imageUrl: "🎵",
    rating: 4.8,
    reviews: 1245,
    category: "Audio",
    description:
      "Active noise cancellation with transparency mode. 8-hour battery per charge, wireless charging case, and premium sound quality.",
  },
  {
    id: 11,
    name: "Fitness Tracker Band",
    price: 89.99,
    imageUrl: "⏱️",
    rating: 4.5,
    reviews: 612,
    category: "Wearables",
    description:
      "Track steps, calories, sleep, and heart rate 24/7. 14-day battery life, water resistant, and syncs with popular health apps.",
  },
  {
    id: 12,
    name: "Smart Thermostat",
    price: 199.99,
    imageUrl: "🌡️",
    rating: 4.7,
    reviews: 445,
    category: "Smart Home",
    description:
      "Learning thermostat that adapts to your schedule. Voice control compatible, energy-saving mode, and smartphone app control.",
  },
  {
    id: 13,
    name: "Security Camera WiFi",
    price: 129.99,
    imageUrl: "📷",
    rating: 4.8,
    reviews: 834,
    category: "Smart Home",
    description:
      "1080p HD with night vision up to 30ft. Two-way audio, motion detection alerts, and cloud storage. Works with major smart home hubs.",
  },
  {
    id: 14,
    name: "Smart Doorbell",
    price: 159.99,
    imageUrl: "🚪",
    rating: 4.9,
    reviews: 723,
    category: "Smart Home",
    description:
      "Video doorbell with 2K resolution and wide-angle lens. Night vision, two-way talk, package detection, and person recognition.",
  },
  {
    id: 15,
    name: "Wireless Charging Pad",
    price: 34.99,
    imageUrl: "⚡",
    rating: 4.6,
    reviews: 1567,
    category: "Power & Charging",
    description:
      "15W fast wireless charging. Works with all Qi-compatible devices, non-slip surface, LED indicator, and compact design.",
  },
  {
    id: 16,
    name: "Laptop Stand Adjustable",
    price: 49.99,
    imageUrl: "💻",
    rating: 4.7,
    reviews: 789,
    category: "Computing",
    description:
      "Ergonomic aluminum stand with 6-level height adjustment. Supports up to 17-inch laptops, portable and foldable design.",
  },
  {
    id: 17,
    name: "External SSD 1TB",
    price: 129.99,
    imageUrl: "💾",
    rating: 4.8,
    reviews: 934,
    category: "Storage",
    description:
      "1TB capacity with 550MB/s transfer speed. Compact and durable, USB-C 3.1, and comes with protective carrying case.",
  },
  {
    id: 18,
    name: "USB Hub Multi-Port",
    price: 59.99,
    imageUrl: "🔗",
    rating: 4.6,
    reviews: 456,
    category: "Cables & Chargers",
    description:
      "7-in-1 hub with USB 3.0, HDMI, SD card reader, and USB-C pass-through charging. Aluminum build with LED indicator.",
  },
  {
    id: 19,
    name: "Phone Stand Holder",
    price: 24.99,
    imageUrl: "📱",
    rating: 4.5,
    reviews: 2103,
    category: "Accessories",
    description:
      "Adjustable phone stand fits 4-7 inch devices. Non-slip base, 270° rotation, works for tabletop or wall mounting.",
  },
  {
    id: 20,
    name: "Tablet Sleeve Case",
    price: 29.99,
    imageUrl: "🎒",
    rating: 4.7,
    reviews: 623,
    category: "Accessories",
    description:
      "Protective neoprene sleeve for 10-inch tablets. Water-resistant, cushioned padding, and convenient carrying handle.",
  },
  {
    id: 21,
    name: "Action Camera 4K",
    price: 299.99,
    imageUrl: "🎬",
    rating: 4.9,
    reviews: 876,
    category: "Camera & Video",
    description:
      "4K video at 60fps with image stabilization. Waterproof to 30m, wide-angle lens, and mounts for any adventure.",
  },
  {
    id: 22,
    name: "Drone Mini",
    price: 399.99,
    imageUrl: "🚁",
    rating: 4.8,
    reviews: 542,
    category: "Gadgets",
    description:
      "Compact drone with 4K camera, 30-minute flight time, and 2km range. Foldable design, intelligent return home, and obstacle avoidance.",
  },
  {
    id: 23,
    name: "Selfie Ring Light",
    price: 29.99,
    imageUrl: "🎆",
    rating: 4.6,
    reviews: 1234,
    category: "Lighting",
    description:
      "6-inch ring light with phone holder. 3 color modes, dimmable brightness, USB powered, perfect for selfies and live streaming.",
  },
  {
    id: 24,
    name: "Phone Lens Kit",
    price: 84.99,
    imageUrl: "📸",
    rating: 4.7,
    reviews: 567,
    category: "Camera & Video",
    description:
      "3-in-1 lens kit: wide-angle, macro, and telephoto. Universal clip attachment works with all smartphones.",
  },
  {
    id: 25,
    name: "Desktop Mic Condenser",
    price: 119.99,
    imageUrl: "🎤",
    rating: 4.8,
    reviews: 723,
    category: "Audio",
    description:
      "Professional cardioid condenser mic with pop filter and shock mount. XLR connection, ideal for podcasting and streaming.",
  },
  {
    id: 26,
    name: "Headphone Stand",
    price: 19.99,
    imageUrl: "🎧",
    rating: 4.5,
    reviews: 934,
    category: "Accessories",
    description:
      "Wooden headphone stand with non-slip base. Elegant design, cable organizer, and fits all headphone sizes.",
  },
  {
    id: 27,
    name: "Cable Organizer Set",
    price: 14.99,
    imageUrl: "📦",
    rating: 4.6,
    reviews: 1567,
    category: "Accessories",
    description:
      "5-piece cable management set with clips and wraps. Keeps your desk organized and cables protected from damage.",
  },
  {
    id: 28,
    name: "Desk Lamp LED",
    price: 44.99,
    imageUrl: "🏮",
    rating: 4.7,
    reviews: 789,
    category: "Lighting",
    description:
      "LED desk lamp with USB charging port. Touch control, adjustable brightness, no flickering, and energy efficient.",
  },
  {
    id: 29,
    name: "Screen Protector Pack",
    price: 9.99,
    imageUrl: "📺",
    rating: 4.4,
    reviews: 2345,
    category: "Accessories",
    description:
      "Pack of 3 tempered glass screen protectors. Anti-fingerprint coating, 9H hardness, and easy installation.",
  },
  {
    id: 30,
    name: "Phone Case Premium",
    price: 34.99,
    imageUrl: "🛡️",
    rating: 4.8,
    reviews: 3456,
    category: "Accessories",
    description:
      "Durable premium case with military-grade protection. Shock-absorbing, slim design, and raised edges for screen protection.",
  },
  {
    id: 31,
    name: "Air Purifier Smart",
    price: 179.99,
    imageUrl: "🌬️",
    rating: 4.7,
    reviews: 445,
    category: "Smart Home",
    description:
      "HEPA filter removes 99.97% of particles. App control, voice commands compatible, auto mode, and energy efficient.",
  },
  {
    id: 32,
    name: "Smart Light Bulb RGB",
    price: 29.99,
    imageUrl: "💡",
    rating: 4.8,
    reviews: 1289,
    category: "Smart Home",
    description:
      "16 million color options with adjustable brightness. Voice control compatible, smartphone app control, and schedules.",
  },
  {
    id: 33,
    name: "Wireless Power Bank",
    price: 69.99,
    imageUrl: "🔋",
    rating: 4.6,
    reviews: 876,
    category: "Power & Charging",
    description:
      "10000mAh with 15W wireless charging. Dual USB ports, LED display, and compact design fits in your pocket.",
  },
  {
    id: 34,
    name: "Fast Charger 65W",
    price: 54.99,
    imageUrl: "⚡",
    rating: 4.8,
    reviews: 1567,
    category: "Power & Charging",
    description:
      "65W super fast charging with multiple USB ports. Supports laptops and phones, compact design, and intelligent power distribution.",
  },
  {
    id: 35,
    name: "VR Headset Strap",
    price: 39.99,
    imageUrl: "🥽",
    rating: 4.5,
    reviews: 234,
    category: "Gaming",
    description:
      "Comfortable replacement head strap for VR headsets. Cushioned padding, adjustable fit, and reduces head pressure.",
  },
  {
    id: 36,
    name: "Gaming Controller",
    price: 89.99,
    imageUrl: "🎮",
    rating: 4.9,
    reviews: 2876,
    category: "Gaming",
    description:
      "Wireless gaming controller with vibration feedback. Works with PC, console, and mobile. 20-hour battery life.",
  },
  {
    id: 37,
    name: "Webcam Cover",
    price: 9.99,
    imageUrl: "🔐",
    rating: 4.7,
    reviews: 1345,
    category: "Accessories",
    description:
      "Ultra-thin webcam cover for privacy. Fits all laptop webcams, adhesive backing, and prevents hacking.",
  },
  {
    id: 38,
    name: "Monitor Arm Stand",
    price: 99.99,
    imageUrl: "🖥️",
    rating: 4.8,
    reviews: 654,
    category: "Computing",
    description:
      "Adjustable monitor arm supports 17-32 inch displays. 360° rotation, tilt and swivel, VESA compatible.",
  },
  {
    id: 39,
    name: "Keyboard Wrist Rest",
    price: 24.99,
    imageUrl: "🧤",
    rating: 4.6,
    reviews: 456,
    category: "Computing",
    description:
      "Memory foam wrist rest for ergonomic support. Non-slip base, reduces strain during long typing sessions.",
  },
  {
    id: 40,
    name: "Cable Clips Adhesive",
    price: 12.99,
    imageUrl: "📎",
    rating: 4.7,
    reviews: 1123,
    category: "Cables & Chargers",
    description:
      "Adhesive cable clips keep cables organized and in place. Set of 6, works on any surface, and removable without damage.",
  },
];

// export async function GET() {
//   //   const data = await prisma.product.deleteMany();
//   const data = await prisma.product.createMany({ data: allProducts });
//   return new Response(JSON.stringify(data));
// }
