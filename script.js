/* ============================================
   VPN SIMULATOR - Main JavaScript
   Fully simulated front-end VPN experience
   ============================================ */

'use strict';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    connectionSteps: [
        'Connecting...',
        'Authenticating...',
        'Securing Tunnel...',
        'Assigning IP...',
        'Connected'
    ],
    stepDurations: [1500, 1200, 1800, 1000, 800],
    updateInterval: 2000,
    threatInterval: 15000,
    fakeCountries: [
        'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
        'Spain', 'Italy', 'Netherlands', 'Switzerland', 'Sweden',
        'Norway', 'Finland', 'Japan', 'South Korea', 'Singapore',
        'India', 'Australia', 'Brazil', 'South Africa', 'Nigeria',
        'UAE', 'Mexico'
    ],
    encryptionTypes: ['AES-256-GCM', 'AES-128-GCM', 'ChaCha20-Poly1305'],
    protocols: ['WireGuard', 'OpenVPN (UDP)', 'OpenVPN (TCP)', 'IKEv2'],
    qualityLevels: ['Excellent', 'Good', 'Fair', 'Poor']
};

// ============================================
// SERVER DATABASE - 120+ servers across continents
// ============================================
const SERVER_DATABASE = [
    // North America
    { id: 1, flag: '🇺🇸', country: 'United States', city: 'New York', ping: 12, load: 34, users: 1256, protocol: 'WireGuard', ip: '103.45.67.89', type: 'streaming', lat: 40.7128, lng: -74.006 },
    { id: 2, flag: '🇺🇸', country: 'United States', city: 'Los Angeles', ping: 18, load: 45, users: 982, protocol: 'OpenVPN', ip: '104.56.78.90', type: 'gaming', lat: 34.0522, lng: -118.2437 },
    { id: 3, flag: '🇺🇸', country: 'United States', city: 'Chicago', ping: 15, load: 28, users: 743, protocol: 'WireGuard', ip: '105.67.89.01', type: 'torrent', lat: 41.8781, lng: -87.6298 },
    { id: 4, flag: '🇺🇸', country: 'United States', city: 'Miami', ping: 22, load: 55, users: 634, protocol: 'IKEv2', ip: '106.78.90.12', type: 'streaming', lat: 25.7617, lng: -80.1918 },
    { id: 5, flag: '🇺🇸', country: 'United States', city: 'Seattle', ping: 14, load: 32, users: 521, protocol: 'WireGuard', ip: '107.89.01.23', type: 'gaming', lat: 47.6062, lng: -122.3321 },
    { id: 6, flag: '🇺🇸', country: 'United States', city: 'Dallas', ping: 16, load: 41, users: 445, protocol: 'OpenVPN', ip: '108.90.12.34', type: 'torrent', lat: 32.7767, lng: -96.797 },
    { id: 7, flag: '🇺🇸', country: 'United States', city: 'Denver', ping: 20, load: 38, users: 312, protocol: 'IKEv2', ip: '109.01.23.45', type: 'streaming', lat: 39.7392, lng: -104.9903 },
    { id: 8, flag: '🇨🇦', country: 'Canada', city: 'Toronto', ping: 17, load: 42, users: 567, protocol: 'WireGuard', ip: '110.12.34.56', type: 'gaming', lat: 43.651, lng: -79.347 },
    { id: 9, flag: '🇨🇦', country: 'Canada', city: 'Vancouver', ping: 21, load: 33, users: 423, protocol: 'OpenVPN', ip: '111.23.45.67', type: 'streaming', lat: 49.2827, lng: -123.1207 },
    { id: 10, flag: '🇨🇦', country: 'Canada', city: 'Montreal', ping: 19, load: 29, users: 298, protocol: 'WireGuard', ip: '112.34.56.78', type: 'torrent', lat: 45.5017, lng: -73.5673 },
    { id: 11, flag: '🇲🇽', country: 'Mexico', city: 'Mexico City', ping: 28, load: 52, users: 412, protocol: 'IKEv2', ip: '113.45.67.89', type: 'streaming', lat: 19.4326, lng: -99.1332 },
    { id: 12, flag: '🇲🇽', country: 'Mexico', city: 'Guadalajara', ping: 31, load: 47, users: 234, protocol: 'WireGuard', ip: '114.56.78.90', type: 'gaming', lat: 20.6597, lng: -103.3496 },
    
    // Europe
    { id: 13, flag: '🇬🇧', country: 'United Kingdom', city: 'London', ping: 8, load: 65, users: 1876, protocol: 'WireGuard', ip: '115.67.89.01', type: 'streaming', lat: 51.5074, lng: -0.1278 },
    { id: 14, flag: '🇬🇧', country: 'United Kingdom', city: 'Manchester', ping: 10, load: 38, users: 654, protocol: 'OpenVPN', ip: '116.78.90.12', type: 'gaming', lat: 53.4808, lng: -2.2426 },
    { id: 15, flag: '🇬🇧', country: 'United Kingdom', city: 'Edinburgh', ping: 11, load: 27, users: 387, protocol: 'IKEv2', ip: '117.89.01.23', type: 'torrent', lat: 55.9533, lng: -3.1883 },
    { id: 16, flag: '🇩🇪', country: 'Germany', city: 'Berlin', ping: 9, load: 48, users: 1234, protocol: 'WireGuard', ip: '118.90.12.34', type: 'gaming', lat: 52.52, lng: 13.405 },
    { id: 17, flag: '🇩🇪', country: 'Germany', city: 'Frankfurt', ping: 7, load: 56, users: 1098, protocol: 'OpenVPN', ip: '119.01.23.45', type: 'streaming', lat: 50.1109, lng: 8.6821 },
    { id: 18, flag: '🇩🇪', country: 'Germany', city: 'Munich', ping: 10, load: 32, users: 567, protocol: 'WireGuard', ip: '120.12.34.56', type: 'torrent', lat: 48.1351, lng: 11.582 },
    { id: 19, flag: '🇫🇷', country: 'France', city: 'Paris', ping: 8, load: 54, users: 1456, protocol: 'WireGuard', ip: '121.23.45.67', type: 'streaming', lat: 48.8566, lng: 2.3522 },
    { id: 20, flag: '🇫🇷', country: 'France', city: 'Lyon', ping: 11, load: 35, users: 432, protocol: 'IKEv2', ip: '122.34.56.78', type: 'gaming', lat: 45.764, lng: 4.8357 },
    { id: 21, flag: '🇫🇷', country: 'France', city: 'Marseille', ping: 13, load: 29, users: 321, protocol: 'OpenVPN', ip: '123.45.67.89', type: 'torrent', lat: 43.2965, lng: 5.3698 },
    { id: 22, flag: '🇪🇸', country: 'Spain', city: 'Madrid', ping: 12, load: 44, users: 876, protocol: 'WireGuard', ip: '124.56.78.90', type: 'streaming', lat: 40.4168, lng: -3.7038 },
    { id: 23, flag: '🇪🇸', country: 'Spain', city: 'Barcelona', ping: 14, load: 37, users: 654, protocol: 'OpenVPN', ip: '125.67.89.01', type: 'gaming', lat: 41.3874, lng: 2.1686 },
    { id: 24, flag: '🇮🇹', country: 'Italy', city: 'Rome', ping: 13, load: 41, users: 765, protocol: 'WireGuard', ip: '126.78.90.12', type: 'streaming', lat: 41.9028, lng: 12.4964 },
    { id: 25, flag: '🇮🇹', country: 'Italy', city: 'Milan', ping: 11, load: 36, users: 543, protocol: 'IKEv2', ip: '127.89.01.23', type: 'torrent', lat: 45.4642, lng: 9.19 },
    { id: 26, flag: '🇳🇱', country: 'Netherlands', city: 'Amsterdam', ping: 6, load: 62, users: 1456, protocol: 'WireGuard', ip: '128.90.12.34', type: 'streaming', lat: 52.3676, lng: 4.9041 },
    { id: 27, flag: '🇳🇱', country: 'Netherlands', city: 'Rotterdam', ping: 8, load: 34, users: 432, protocol: 'OpenVPN', ip: '129.01.23.45', type: 'gaming', lat: 51.9244, lng: 4.4777 },
    { id: 28, flag: '🇨🇭', country: 'Switzerland', city: 'Zurich', ping: 10, load: 31, users: 387, protocol: 'IKEv2', ip: '130.12.34.56', type: 'torrent', lat: 47.3769, lng: 8.5417 },
    { id: 29, flag: '🇨🇭', country: 'Switzerland', city: 'Geneva', ping: 12, load: 26, users: 234, protocol: 'WireGuard', ip: '131.23.45.67', type: 'streaming', lat: 46.2044, lng: 6.1432 },
    { id: 30, flag: '🇸🇪', country: 'Sweden', city: 'Stockholm', ping: 9, load: 39, users: 567, protocol: 'WireGuard', ip: '132.34.56.78', type: 'gaming', lat: 59.3293, lng: 18.0686 },
    { id: 31, flag: '🇸🇪', country: 'Sweden', city: 'Gothenburg', ping: 11, load: 28, users: 298, protocol: 'OpenVPN', ip: '133.45.67.89', type: 'torrent', lat: 57.7089, lng: 11.9746 },
    { id: 32, flag: '🇳🇴', country: 'Norway', city: 'Oslo', ping: 10, load: 33, users: 345, protocol: 'WireGuard', ip: '134.56.78.90', type: 'streaming', lat: 59.9139, lng: 10.7522 },
    { id: 33, flag: '🇫🇮', country: 'Finland', city: 'Helsinki', ping: 12, load: 30, users: 287, protocol: 'IKEv2', ip: '135.67.89.01', type: 'gaming', lat: 60.1699, lng: 24.9384 },
    { id: 34, flag: '🇦🇹', country: 'Austria', city: 'Vienna', ping: 11, load: 35, users: 456, protocol: 'WireGuard', ip: '136.78.90.12', type: 'streaming', lat: 48.2082, lng: 16.3738 },
    { id: 35, flag: '🇧🇪', country: 'Belgium', city: 'Brussels', ping: 9, load: 38, users: 398, protocol: 'OpenVPN', ip: '137.89.01.23', type: 'torrent', lat: 50.8503, lng: 4.3517 },
    { id: 36, flag: '🇮🇪', country: 'Ireland', city: 'Dublin', ping: 10, load: 36, users: 412, protocol: 'WireGuard', ip: '138.90.12.34', type: 'gaming', lat: 53.3498, lng: -6.2603 },
    { id: 37, flag: '🇵🇹', country: 'Portugal', city: 'Lisbon', ping: 15, load: 32, users: 345, protocol: 'IKEv2', ip: '139.01.23.45', type: 'streaming', lat: 38.7223, lng: -9.1393 },
    { id: 38, flag: '🇩🇰', country: 'Denmark', city: 'Copenhagen', ping: 10, load: 29, users: 312, protocol: 'WireGuard', ip: '140.12.34.56', type: 'torrent', lat: 55.6761, lng: 12.5683 },
    { id: 39, flag: '🇵🇱', country: 'Poland', city: 'Warsaw', ping: 14, load: 37, users: 432, protocol: 'OpenVPN', ip: '141.23.45.67', type: 'gaming', lat: 52.2297, lng: 21.0122 },
    { id: 40, flag: '🇵🇱', country: 'Poland', city: 'Krakow', ping: 16, load: 28, users: 234, protocol: 'WireGuard', ip: '142.34.56.78', type: 'streaming', lat: 50.0647, lng: 19.945 },
    { id: 41, flag: '🇨🇿', country: 'Czech Republic', city: 'Prague', ping: 13, load: 34, users: 376, protocol: 'IKEv2', ip: '143.45.67.89', type: 'torrent', lat: 50.0755, lng: 14.4378 },
    { id: 42, flag: '🇬🇷', country: 'Greece', city: 'Athens', ping: 18, load: 31, users: 287, protocol: 'WireGuard', ip: '144.56.78.90', type: 'gaming', lat: 37.9838, lng: 23.7275 },
    { id: 43, flag: '🇭🇺', country: 'Hungary', city: 'Budapest', ping: 15, load: 33, users: 298, protocol: 'OpenVPN', ip: '145.67.89.01', type: 'streaming', lat: 47.4979, lng: 19.0402 },
    { id: 44, flag: '🇷🇴', country: 'Romania', city: 'Bucharest', ping: 17, load: 30, users: 265, protocol: 'WireGuard', ip: '146.78.90.12', type: 'torrent', lat: 44.4268, lng: 26.1025 },
    { id: 45, flag: '🇺🇦', country: 'Ukraine', city: 'Kyiv', ping: 19, load: 35, users: 345, protocol: 'IKEv2', ip: '147.89.01.23', type: 'gaming', lat: 50.4501, lng: 30.5234 },

    // Asia
    { id: 46, flag: '🇯🇵', country: 'Japan', city: 'Tokyo', ping: 25, load: 68, users: 1876, protocol: 'WireGuard', ip: '148.90.12.34', type: 'streaming', lat: 35.6762, lng: 139.6503 },
    { id: 47, flag: '🇯🇵', country: 'Japan', city: 'Osaka', ping: 27, load: 45, users: 765, protocol: 'OpenVPN', ip: '149.01.23.45', type: 'gaming', lat: 34.6937, lng: 135.5023 },
    { id: 48, flag: '🇯🇵', country: 'Japan', city: 'Nagoya', ping: 28, load: 32, users: 432, protocol: 'IKEv2', ip: '150.12.34.56', type: 'torrent', lat: 35.1815, lng: 136.9066 },
    { id: 49, flag: '🇰🇷', country: 'South Korea', city: 'Seoul', ping: 22, load: 58, users: 1234, protocol: 'WireGuard', ip: '151.23.45.67', type: 'gaming', lat: 37.5665, lng: 126.978 },
    { id: 50, flag: '🇰🇷', country: 'South Korea', city: 'Busan', ping: 24, load: 38, users: 567, protocol: 'OpenVPN', ip: '152.34.56.78', type: 'streaming', lat: 35.1796, lng: 129.0756 },
    { id: 51, flag: '🇸🇬', country: 'Singapore', city: 'Singapore', ping: 18, load: 55, users: 987, protocol: 'WireGuard', ip: '153.45.67.89', type: 'streaming', lat: 1.3521, lng: 103.8198 },
    { id: 52, flag: '🇮🇳', country: 'India', city: 'Mumbai', ping: 32, load: 52, users: 876, protocol: 'OpenVPN', ip: '154.56.78.90', type: 'streaming', lat: 19.076, lng: 72.8777 },
    { id: 53, flag: '🇮🇳', country: 'India', city: 'Bangalore', ping: 30, load: 44, users: 654, protocol: 'WireGuard', ip: '155.67.89.01', type: 'gaming', lat: 12.9716, lng: 77.5946 },
    { id: 54, flag: '🇮🇳', country: 'India', city: 'Delhi', ping: 33, load: 48, users: 543, protocol: 'IKEv2', ip: '156.78.90.12', type: 'torrent', lat: 28.7041, lng: 77.1025 },
    { id: 55, flag: '🇮🇳', country: 'India', city: 'Chennai', ping: 34, load: 36, users: 321, protocol: 'WireGuard', ip: '157.89.01.23', type: 'streaming', lat: 13.0827, lng: 80.2707 },
    { id: 56, flag: '🇭🇰', country: 'Hong Kong', city: 'Hong Kong', ping: 20, load: 49, users: 765, protocol: 'WireGuard', ip: '158.90.12.34', type: 'gaming', lat: 22.3193, lng: 114.1694 },
    { id: 57, flag: '🇹🇼', country: 'Taiwan', city: 'Taipei', ping: 23, load: 40, users: 432, protocol: 'OpenVPN', ip: '159.01.23.45', type: 'torrent', lat: 25.033, lng: 121.5654 },
    { id: 58, flag: '🇹🇭', country: 'Thailand', city: 'Bangkok', ping: 28, load: 42, users: 456, protocol: 'IKEv2', ip: '160.12.34.56', type: 'streaming', lat: 13.7563, lng: 100.5018 },
    { id: 59, flag: '🇻🇳', country: 'Vietnam', city: 'Ho Chi Minh City', ping: 30, load: 35, users: 345, protocol: 'WireGuard', ip: '161.23.45.67', type: 'gaming', lat: 10.8231, lng: 106.6297 },
    { id: 60, flag: '🇵🇭', country: 'Philippines', city: 'Manila', ping: 32, load: 38, users: 298, protocol: 'OpenVPN', ip: '162.34.56.78', type: 'torrent', lat: 14.5995, lng: 120.9842 },
    { id: 61, flag: '🇮🇩', country: 'Indonesia', city: 'Jakarta', ping: 31, load: 40, users: 432, protocol: 'WireGuard', ip: '163.45.67.89', type: 'streaming', lat: -6.2088, lng: 106.8456 },
    { id: 62, flag: '🇲🇾', country: 'Malaysia', city: 'Kuala Lumpur', ping: 26, load: 37, users: 376, protocol: 'IKEv2', ip: '164.56.78.90', type: 'gaming', lat: 3.139, lng: 101.6869 },
    { id: 63, flag: '🇦🇪', country: 'UAE', city: 'Dubai', ping: 24, load: 46, users: 654, protocol: 'WireGuard', ip: '165.67.89.01', type: 'streaming', lat: 25.2048, lng: 55.2708 },
    { id: 64, flag: '🇦🇪', country: 'UAE', city: 'Abu Dhabi', ping: 25, load: 35, users: 345, protocol: 'OpenVPN', ip: '166.78.90.12', type: 'gaming', lat: 24.4539, lng: 54.3773 },
    { id: 65, flag: '🇮🇱', country: 'Israel', city: 'Tel Aviv', ping: 22, load: 38, users: 432, protocol: 'WireGuard', ip: '167.89.01.23', type: 'torrent', lat: 32.0853, lng: 34.7818 },
    { id: 66, flag: '🇸🇦', country: 'Saudi Arabia', city: 'Riyadh', ping: 28, load: 34, users: 298, protocol: 'IKEv2', ip: '168.90.12.34', type: 'streaming', lat: 24.7136, lng: 46.6753 },
    { id: 67, flag: '🇹🇷', country: 'Turkey', city: 'Istanbul', ping: 20, load: 42, users: 567, protocol: 'WireGuard', ip: '169.01.23.45', type: 'gaming', lat: 41.0082, lng: 28.9784 },
    { id: 68, flag: '🇹🇷', country: 'Turkey', city: 'Ankara', ping: 22, load: 31, users: 234, protocol: 'OpenVPN', ip: '170.12.34.56', type: 'torrent', lat: 39.9334, lng: 32.8597 },
    { id: 69, flag: '🇰🇿', country: 'Kazakhstan', city: 'Almaty', ping: 30, load: 28, users: 187, protocol: 'IKEv2', ip: '171.23.45.67', type: 'streaming', lat: 43.222, lng: 76.8512 },

    // Oceania
    { id: 70, flag: '🇦🇺', country: 'Australia', city: 'Sydney', ping: 35, load: 52, users: 876, protocol: 'WireGuard', ip: '172.34.56.78', type: 'streaming', lat: -33.8688, lng: 151.2093 },
    { id: 71, flag: '🇦🇺', country: 'Australia', city: 'Melbourne', ping: 37, load: 44, users: 654, protocol: 'OpenVPN', ip: '173.45.67.89', type: 'gaming', lat: -37.8136, lng: 144.9631 },
    { id: 72, flag: '🇦🇺', country: 'Australia', city: 'Brisbane', ping: 38, load: 35, users: 432, protocol: 'IKEv2', ip: '174.56.78.90', type: 'torrent', lat: -27.4698, lng: 153.0251 },
    { id: 73, flag: '🇦🇺', country: 'Australia', city: 'Perth', ping: 40, load: 30, users: 298, protocol: 'WireGuard', ip: '175.67.89.01', type: 'streaming', lat: -31.9505, lng: 115.8605 },
    { id: 74, flag: '🇦🇺', country: 'Australia', city: 'Adelaide', ping: 39, load: 28, users: 234, protocol: 'OpenVPN', ip: '176.78.90.12', type: 'gaming', lat: -34.9285, lng: 138.6007 },
    { id: 75, flag: '🇳🇿', country: 'New Zealand', city: 'Auckland', ping: 42, load: 33, users: 312, protocol: 'WireGuard', ip: '177.89.01.23', type: 'streaming', lat: -36.8485, lng: 174.7633 },
    { id: 76, flag: '🇳🇿', country: 'New Zealand', city: 'Wellington', ping: 44, load: 26, users: 187, protocol: 'IKEv2', ip: '178.90.12.34', type: 'torrent', lat: -41.2865, lng: 174.7762 },
    { id: 77, flag: '🇫🇯', country: 'Fiji', city: 'Suva', ping: 48, load: 22, users: 98, protocol: 'OpenVPN', ip: '179.01.23.45', type: 'gaming', lat: -18.1248, lng: 178.4501 },

    // South America
    { id: 78, flag: '🇧🇷', country: 'Brazil', city: 'Sao Paulo', ping: 42, load: 55, users: 987, protocol: 'WireGuard', ip: '180.12.34.56', type: 'streaming', lat: -23.5505, lng: -46.6333 },
    { id: 79, flag: '🇧🇷', country: 'Brazil', city: 'Rio de Janeiro', ping: 44, load: 46, users: 654, protocol: 'OpenVPN', ip: '181.23.45.67', type: 'gaming', lat: -22.9068, lng: -43.1729 },
    { id: 80, flag: '🇧🇷', country: 'Brazil', city: 'Brasilia', ping: 45, load: 38, users: 432, protocol: 'IKEv2', ip: '182.34.56.78', type: 'torrent', lat: -15.7975, lng: -47.8919 },
    { id: 81, flag: '🇧🇷', country: 'Brazil', city: 'Salvador', ping: 47, load: 32, users: 298, protocol: 'WireGuard', ip: '183.45.67.89', type: 'streaming', lat: -12.9714, lng: -38.5014 },
    { id: 82, flag: '🇦🇷', country: 'Argentina', city: 'Buenos Aires', ping: 46, load: 42, users: 567, protocol: 'WireGuard', ip: '184.56.78.90', type: 'streaming', lat: -34.6037, lng: -58.3816 },
    { id: 83, flag: '🇦🇷', country: 'Argentina', city: 'Cordoba', ping: 48, load: 34, users: 312, protocol: 'OpenVPN', ip: '185.67.89.01', type: 'gaming', lat: -31.4201, lng: -64.1888 },
    { id: 84, flag: '🇨🇱', country: 'Chile', city: 'Santiago', ping: 45, load: 38, users: 376, protocol: 'IKEv2', ip: '186.78.90.12', type: 'torrent', lat: -33.4489, lng: -70.6693 },
    { id: 85, flag: '🇨🇴', country: 'Colombia', city: 'Bogota', ping: 40, load: 40, users: 432, protocol: 'WireGuard', ip: '187.89.01.23', type: 'streaming', lat: 4.711, lng: -74.0721 },
    { id: 86, flag: '🇵🇪', country: 'Peru', city: 'Lima', ping: 43, load: 35, users: 298, protocol: 'OpenVPN', ip: '188.90.12.34', type: 'gaming', lat: -12.0464, lng: -77.0428 },
    { id: 87, flag: '🇻🇪', country: 'Venezuela', city: 'Caracas', ping: 42, load: 32, users: 234, protocol: 'WireGuard', ip: '189.01.23.45', type: 'torrent', lat: 10.4806, lng: -66.9036 },
    { id: 88, flag: '🇪🇨', country: 'Ecuador', city: 'Quito', ping: 44, load: 28, users: 187, protocol: 'IKEv2', ip: '190.12.34.56', type: 'streaming', lat: -0.1807, lng: -78.4678 },

    // Africa
    { id: 89, flag: '🇿🇦', country: 'South Africa', city: 'Johannesburg', ping: 50, load: 48, users: 654, protocol: 'WireGuard', ip: '191.23.45.67', type: 'streaming', lat: -26.2041, lng: 28.0473 },
    { id: 90, flag: '🇿🇦', country: 'South Africa', city: 'Cape Town', ping: 52, load: 40, users: 432, protocol: 'OpenVPN', ip: '192.34.56.78', type: 'gaming', lat: -33.9249, lng: 18.4241 },
    { id: 91, flag: '🇿🇦', country: 'South Africa', city: 'Durban', ping: 53, load: 32, users: 298, protocol: 'IKEv2', ip: '193.45.67.89', type: 'torrent', lat: -29.8587, lng: 31.0218 },
    { id: 92, flag: '🇳🇬', country: 'Nigeria', city: 'Lagos', ping: 48, load: 44, users: 567, protocol: 'WireGuard', ip: '194.56.78.90', type: 'streaming', lat: 6.5244, lng: 3.3792 },
    { id: 93, flag: '🇳🇬', country: 'Nigeria', city: 'Abuja', ping: 50, load: 35, users: 345, protocol: 'OpenVPN', ip: '195.67.89.01', type: 'gaming', lat: 9.0765, lng: 7.3986 },
    { id: 94, flag: '🇰🇪', country: 'Kenya', city: 'Nairobi', ping: 46, load: 38, users: 376, protocol: 'WireGuard', ip: '196.78.90.12', type: 'streaming', lat: -1.2921, lng: 36.8219 },
    { id: 95, flag: '🇪🇬', country: 'Egypt', city: 'Cairo', ping: 38, load: 42, users: 543, protocol: 'IKEv2', ip: '197.89.01.23', type: 'torrent', lat: 30.0444, lng: 31.2357 },
    { id: 96, flag: '🇪🇬', country: 'Egypt', city: 'Alexandria', ping: 40, load: 32, users: 298, protocol: 'WireGuard', ip: '198.90.12.34', type: 'gaming', lat: 31.2001, lng: 29.9187 },
    { id: 97, flag: '🇲🇦', country: 'Morocco', city: 'Casablanca', ping: 36, load: 35, users: 321, protocol: 'OpenVPN', ip: '199.01.23.45', type: 'streaming', lat: 33.5731, lng: -7.5898 },
    { id: 98, flag: '🇬🇭', country: 'Ghana', city: 'Accra', ping: 45, load: 30, users: 234, protocol: 'WireGuard', ip: '200.12.34.56', type: 'torrent', lat: 5.6037, lng: -0.187 },
    { id: 99, flag: '🇹🇿', country: 'Tanzania', city: 'Dar es Salaam', ping: 48, load: 28, users: 187, protocol: 'IKEv2', ip: '201.23.45.67', type: 'gaming', lat: -6.7924, lng: 39.2083 },
    { id: 100, flag: '🇪🇹', country: 'Ethiopia', city: 'Addis Ababa', ping: 50, load: 26, users: 165, protocol: 'WireGuard', ip: '202.34.56.78', type: 'streaming', lat: 9.032, lng: 38.7469 },
    { id: 101, flag: '🇩🇿', country: 'Algeria', city: 'Algiers', ping: 38, load: 30, users: 234, protocol: 'OpenVPN', ip: '203.45.67.89', type: 'torrent', lat: 36.7538, lng: 3.0588 },
    { id: 102, flag: '🇦🇴', country: 'Angola', city: 'Luanda', ping: 52, load: 28, users: 198, protocol: 'WireGuard', ip: '204.56.78.90', type: 'gaming', lat: -8.839, lng: 13.2894 },

    // Additional European servers
    { id: 103, flag: '🇷🇺', country: 'Russia', city: 'Moscow', ping: 22, load: 58, users: 1234, protocol: 'WireGuard', ip: '205.67.89.01', type: 'streaming', lat: 55.7558, lng: 37.6173 },
    { id: 104, flag: '🇷🇺', country: 'Russia', city: 'Saint Petersburg', ping: 24, load: 44, users: 876, protocol: 'OpenVPN', ip: '206.78.90.12', type: 'gaming', lat: 59.9343, lng: 30.3351 },
    { id: 105, flag: '🇷🇺', country: 'Russia', city: 'Novosibirsk', ping: 30, load: 32, users: 432, protocol: 'IKEv2', ip: '207.89.01.23', type: 'torrent', lat: 55.0084, lng: 82.9357 },
    { id: 106, flag: '🇱🇺', country: 'Luxembourg', city: 'Luxembourg', ping: 8, load: 26, users: 234, protocol: 'WireGuard', ip: '208.90.12.34', type: 'streaming', lat: 49.6117, lng: 6.13 },
    { id: 107, flag: '🇲🇨', country: 'Monaco', city: 'Monaco', ping: 10, load: 22, users: 187, protocol: 'OpenVPN', ip: '209.01.23.45', type: 'gaming', lat: 43.7384, lng: 7.4246 },
    { id: 108, flag: '🇲🇹', country: 'Malta', city: 'Valletta', ping: 14, load: 24, users: 165, protocol: 'WireGuard', ip: '210.12.34.56', type: 'torrent', lat: 35.8997, lng: 14.5147 },
    { id: 109, flag: '🇮🇸', country: 'Iceland', city: 'Reykjavik', ping: 16, load: 22, users: 145, protocol: 'IKEv2', ip: '211.23.45.67', type: 'streaming', lat: 64.1466, lng: -21.9426 },
    { id: 110, flag: '🇧🇬', country: 'Bulgaria', city: 'Sofia', ping: 16, load: 30, users: 287, protocol: 'WireGuard', ip: '212.34.56.78', type: 'gaming', lat: 42.6977, lng: 23.3219 },
    { id: 111, flag: '🇭🇷', country: 'Croatia', city: 'Zagreb', ping: 15, load: 28, users: 234, protocol: 'OpenVPN', ip: '213.45.67.89', type: 'torrent', lat: 45.815, lng: 15.9819 },
    { id: 112, flag: '🇷🇸', country: 'Serbia', city: 'Belgrade', ping: 17, load: 32, users: 276, protocol: 'WireGuard', ip: '214.56.78.90', type: 'streaming', lat: 44.7866, lng: 20.4489 },
    { id: 113, flag: '🇸🇰', country: 'Slovakia', city: 'Bratislava', ping: 14, load: 26, users: 198, protocol: 'IKEv2', ip: '215.67.89.01', type: 'gaming', lat: 48.1486, lng: 17.1077 },
    { id: 114, flag: '🇸🇮', country: 'Slovenia', city: 'Ljubljana', ping: 13, load: 24, users: 176, protocol: 'WireGuard', ip: '216.78.90.12', type: 'torrent', lat: 46.0569, lng: 14.5058 },
    { id: 115, flag: '🇱🇻', country: 'Latvia', city: 'Riga', ping: 15, load: 28, users: 212, protocol: 'OpenVPN', ip: '217.89.01.23', type: 'streaming', lat: 56.9496, lng: 24.1052 },
    { id: 116, flag: '🇱🇹', country: 'Lithuania', city: 'Vilnius', ping: 16, load: 26, users: 187, protocol: 'WireGuard', ip: '218.90.12.34', type: 'gaming', lat: 54.6872, lng: 25.2797 },
    { id: 117, flag: '🇪🇪', country: 'Estonia', city: 'Tallinn', ping: 14, load: 24, users: 198, protocol: 'IKEv2', ip: '219.01.23.45', type: 'torrent', lat: 59.437, lng: 24.7536 },
    { id: 118, flag: '🇨🇾', country: 'Cyprus', city: 'Nicosia', ping: 20, load: 28, users: 234, protocol: 'WireGuard', ip: '220.12.34.56', type: 'streaming', lat: 35.1856, lng: 33.3823 },
    { id: 119, flag: '🇬🇪', country: 'Georgia', city: 'Tbilisi', ping: 22, load: 26, users: 187, protocol: 'OpenVPN', ip: '221.23.45.67', type: 'gaming', lat: 41.7151, lng: 44.8271 },
    { id: 120, flag: '🇦🇲', country: 'Armenia', city: 'Yerevan', ping: 24, load: 24, users: 165, protocol: 'WireGuard', ip: '222.34.56.78', type: 'torrent', lat: 40.1792, lng: 44.4991 },
    { id: 121, flag: '🇦🇿', country: 'Azerbaijan', city: 'Baku', ping: 26, load: 28, users: 198, protocol: 'IKEv2', ip: '223.45.67.89', type: 'streaming', lat: 40.4093, lng: 49.8671 },
    { id: 122, flag: '🇵🇰', country: 'Pakistan', city: 'Karachi', ping: 34, load: 36, users: 345, protocol: 'WireGuard', ip: '224.56.78.90', type: 'gaming', lat: 24.8607, lng: 67.0011 },
    { id: 123, flag: '🇧🇩', country: 'Bangladesh', city: 'Dhaka', ping: 36, load: 34, users: 298, protocol: 'OpenVPN', ip: '225.67.89.01', type: 'torrent', lat: 23.8103, lng: 90.4125 },
    { id: 124, flag: '🇱🇰', country: 'Sri Lanka', city: 'Colombo', ping: 35, load: 30, users: 234, protocol: 'WireGuard', ip: '226.78.90.12', type: 'streaming', lat: 6.9271, lng: 79.8612 },
    { id: 125, flag: '🇳🇵', country: 'Nepal', city: 'Kathmandu', ping: 38, load: 28, users: 187, protocol: 'IKEv2', ip: '227.89.01.23', type: 'gaming', lat: 27.7172, lng: 85.324 },
    { id: 126, flag: '🇺🇾', country: 'Uruguay', city: 'Montevideo', ping: 46, load: 28, users: 198, protocol: 'WireGuard', ip: '228.90.12.34', type: 'torrent', lat: -34.9011, lng: -56.1645 },
    { id: 127, flag: '🇵🇾', country: 'Paraguay', city: 'Asuncion', ping: 47, load: 26, users: 176, protocol: 'OpenVPN', ip: '229.01.23.45', type: 'streaming', lat: -25.2637, lng: -57.5759 },
    { id: 128, flag: '🇧🇴', country: 'Bolivia', city: 'La Paz', ping: 48, load: 24, users: 165, protocol: 'WireGuard', ip: '230.12.34.56', type: 'gaming', lat: -16.5, lng: -68.15 },
    { id: 129, flag: '🇨🇷', country: 'Costa Rica', city: 'San Jose', ping: 38, load: 30, users: 212, protocol: 'IKEv2', ip: '231.23.45.67', type: 'torrent', lat: 9.9281, lng: -84.0907 },
    { id: 130, flag: '🇵🇦', country: 'Panama', city: 'Panama City', ping: 36, load: 32, users: 234, protocol: 'WireGuard', ip: '232.34.56.78', type: 'streaming', lat: 8.9824, lng: -79.5199 },
];

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    isConnected: false,
    isConnecting: false,
    currentServer: null,
    currentStep: 0,
    sessionStartTime: null,
    sessionTimer: null,
    dataUsed: 0,
    connectionHistory: [],
    favorites: new Set(),
    recentConnections: [],
    autoConnect: false,
    autoReconnect: false,
    killSwitch: false,
    splitTunnel: false,
    doubleVpn: false,
    multiHop: false,
    smartRouting: false,
    theme: 'dark',
    accentColor: '#00d4ff',
    language: 'English',
    notifications: true,
    protectionFeatures: {
        dns: true,
        ipv6: true,
        webrtc: true,
        malware: true,
        adblock: true,
        tracker: true,
        cookie: true,
        firewall: true,
        wifi: true,
    },
    threatCount: 0,
    totalThreats: 0,
    connectionLogs: [],
    securityScore: 85,
    lastSpeedTest: null,
    isSpeedTesting: false,
};

// ============================================
// DOM REFERENCES
// ============================================
const DOM = {
    connectBtn: document.getElementById('connect-btn'),
    quickConnectBtn: document.getElementById('quick-connect-btn'),
    autoConnectToggle: document.getElementById('auto-connect-toggle'),
    statusIndicator: document.querySelector('.status-indicator'),
    statusText: document.querySelector('.status-text'),
    serverList: document.getElementById('server-list'),
    serverSearch: document.getElementById('server-search'),
    countryFilter: document.getElementById('country-filter'),
    cityFilter: document.getElementById('city-filter'),
    purposeFilter: document.getElementById('purpose-filter'),
    publicIp: document.getElementById('public-ip'),
    privateIp: document.getElementById('private-ip'),
    pingDisplay: document.getElementById('ping-display'),
    downloadSpeed: document.getElementById('download-speed'),
    uploadSpeed: document.getElementById('upload-speed'),
    connTime: document.getElementById('conn-time'),
    serverLoad: document.getElementById('server-load'),
    encryptionStatus: document.getElementById('encryption-status'),
    networkQuality: document.getElementById('network-quality'),
    dataUsed: document.getElementById('data-used'),
    sessionTimer: document.getElementById('session-timer'),
    bottomData: document.getElementById('bottom-data'),
    bottomSpeed: document.getElementById('bottom-speed'),
    bottomStatus: document.getElementById('bottom-status'),
    serverCount: document.getElementById('server-count'),
    liveClock: document.getElementById('live-clock'),
    cpuMonitor: document.getElementById('cpu-monitor'),
    ramMonitor: document.getElementById('ram-monitor'),
    connectedLocation: document.getElementById('connected-location'),
    privacyScore: document.getElementById('privacy-score'),
    privacyGauge: document.getElementById('privacy-gauge'),
    toastContainer: document.getElementById('toast-container'),
    themeToggle: document.getElementById('theme-toggle'),
    protocolSelect: document.getElementById('protocol-select'),
    historyModal: document.getElementById('history-modal'),
    historyList: document.getElementById('history-list'),
    speedtestModal: document.getElementById('speedtest-modal'),
    settingsModal: document.getElementById('settings-modal'),
    threatPopup: document.getElementById('threat-popup'),
    threatMsg: document.getElementById('threat-msg'),
    autoConnectCheck: document.getElementById('settings-autoconnect'),
    autoReconnectCheck: document.getElementById('settings-autoreconnect'),
    killSwitchCheck: document.getElementById('settings-killswitch'),
    accentPicker: document.getElementById('accent-color-picker'),
    settingsThemeToggle: document.getElementById('settings-theme-toggle'),
    languageSelect: document.getElementById('settings-language'),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function generateIP() {
    return `${random(10, 223)}.${random(0, 255)}.${random(0, 255)}.${random(1, 254)}`;
}

function getRandomEncryption() {
    return CONFIG.encryptionTypes[random(0, CONFIG.encryptionTypes.length - 1)];
}

function getNetworkQuality(ping) {
    if (ping < 15) return 'Excellent';
    if (ping < 25) return 'Good';
    if (ping < 40) return 'Fair';
    return 'Poor';
}

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showToast(message, type = 'info', duration = 4000) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle',
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    });
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

// ============================================
// PARTICLE SYSTEM
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        const container = document.getElementById('particles-canvas');
        container.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                pulse: Math.random() * Math.PI * 2,
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.01;
            
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.1;
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, `rgba(0, 212, 255, ${pulseOpacity})`);
            gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${pulseOpacity * 1.5})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((p1, i) => {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
}

// ============================================
// 3D GLOBE - Canvas-based with rotation, pins, network lines
// ============================================
class Globe {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.getElementById('globe-3d-container');
        this.container.appendChild(this.canvas);
        
        this.rotation = 0;
        this.targetRotation = 0;
        this.scale = 1;
        this.targetScale = 1;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.rotationSpeed = 0.003;
        this.autoRotate = true;
        this.hoveredPin = null;
        this.connectedPin = null;
        
        this.resize();
        this.setupPins();
        this.animate();
        this.bindEvents();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width || 400;
        this.height = rect.height || 340;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.radius = Math.min(this.width, this.height) * 0.32;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }
    
    setupPins() {
        // Define key country locations on the globe (lat/lng -> 3D projection)
        this.pins = [
            { country: 'United States', lat: 38.5, lng: -98.0, label: 'US' },
            { country: 'Canada', lat: 56.0, lng: -106.0, label: 'CA' },
            { country: 'United Kingdom', lat: 55.0, lng: -3.0, label: 'UK' },
            { country: 'Germany', lat: 51.0, lng: 10.0, label: 'DE' },
            { country: 'France', lat: 46.0, lng: 2.0, label: 'FR' },
            { country: 'Spain', lat: 40.0, lng: -4.0, label: 'ES' },
            { country: 'Italy', lat: 42.0, lng: 12.0, label: 'IT' },
            { country: 'Netherlands', lat: 52.0, lng: 5.0, label: 'NL' },
            { country: 'Switzerland', lat: 47.0, lng: 8.0, label: 'CH' },
            { country: 'Sweden', lat: 62.0, lng: 15.0, label: 'SE' },
            { country: 'Norway', lat: 62.0, lng: 10.0, label: 'NO' },
            { country: 'Finland', lat: 64.0, lng: 26.0, label: 'FI' },
            { country: 'Japan', lat: 36.0, lng: 138.0, label: 'JP' },
            { country: 'South Korea', lat: 37.0, lng: 127.5, label: 'KR' },
            { country: 'Singapore', lat: 1.35, lng: 103.8, label: 'SG' },
            { country: 'India', lat: 20.0, lng: 77.0, label: 'IN' },
            { country: 'Australia', lat: -25.0, lng: 133.0, label: 'AU' },
            { country: 'Brazil', lat: -14.0, lng: -51.0, label: 'BR' },
            { country: 'South Africa', lat: -30.0, lng: 26.0, label: 'ZA' },
            { country: 'Nigeria', lat: 8.0, lng: 8.0, label: 'NG' },
            { country: 'UAE', lat: 24.0, lng: 54.0, label: 'AE' },
            { country: 'Mexico', lat: 23.0, lng: -102.0, label: 'MX' },
        ];
        
        // Network lines between major hubs
        this.networkLines = [
            ['United States', 'United Kingdom'],
            ['United States', 'Japan'],
            ['United Kingdom', 'Germany'],
            ['United Kingdom', 'Singapore'],
            ['Germany', 'India'],
            ['Singapore', 'Australia'],
            ['United States', 'Brazil'],
            ['United Kingdom', 'South Africa'],
            ['Japan', 'South Korea'],
            ['Singapore', 'UAE'],
            ['Germany', 'Nigeria'],
            ['United States', 'Canada'],
            ['United Kingdom', 'France'],
            ['United States', 'Mexico'],
            ['United Kingdom', 'Spain'],
            ['Germany', 'Italy'],
            ['Singapore', 'India'],
            ['Japan', 'Australia'],
            ['United Kingdom', 'Sweden'],
            ['United States', 'Germany'],
        ];
    }
    
    latLngToPosition(lat, lng) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        const x = -this.radius * Math.sin(phi) * Math.cos(theta);
        const y = this.radius * Math.cos(phi);
        const z = this.radius * Math.sin(phi) * Math.sin(theta);
        return { x, y, z };
    }
    
    project3D(x, y, z) {
        const rot = this.rotation;
        // Rotate around Y axis
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        const rx = x * cosR - z * sinR;
        const rz = x * sinR + z * cosR;
        
        const perspective = 400 / (400 + rz);
        const px = this.centerX + rx * perspective * this.scale;
        const py = this.centerY + y * perspective * this.scale;
        const pz = rz;
        
        return { x: px, y: py, z: pz, visible: rz > -this.radius * 0.7 };
    }
    
    drawGlobe() {
        const ctx = this.ctx;
        
        // Globe glow
        const glowGrad = ctx.createRadialGradient(
            this.centerX, this.centerY, this.radius * 0.5,
            this.centerX, this.centerY, this.radius * 1.8
        );
        glowGrad.addColorStop(0, `rgba(0, 212, 255, ${state.isConnected ? 0.2 : 0.08})`);
        glowGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius * 1.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Globe base
        const grad = ctx.createRadialGradient(
            this.centerX - this.radius * 0.3,
            this.centerY - this.radius * 0.3,
            this.radius * 0.1,
            this.centerX, this.centerY,
            this.radius
        );
        grad.addColorStop(0, '#1e3a5f');
        grad.addColorStop(0.3, '#0f2847');
        grad.add}