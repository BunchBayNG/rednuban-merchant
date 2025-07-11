// lib/mockdata.ts
export interface DashboardMetric {
    id: string;
    title: string;
    value: string | number;
    change: number;
    changeType: 'positive' | 'negative';
    period: string;
  }
  
  export interface ChartDataPoint {
    month: string;
    value: number;
  }
  
  export interface MerchantData {
    id: string;
    name: string;
    email: string;
    amount: string;
    avatar: string;
  }
  
  export interface PayoutData {
    succeeded: number;
    failed: number;
    successAmount: string;
    failedAmount: string;
  }
  
  // Top metrics data
  export const dashboardMetrics: DashboardMetric[] = [
    {
      id: 'total-merchants',
      title: 'Total Merchants',
      value: '134,790',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'total-vnubans',
      title: 'Total vNUBANs',
      value: '1,900,789',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'virtual-transaction-flow',
      title: 'Count of Virtual Transaction Flow',
      value: '12,900',
      change: -12.2,
      changeType: 'negative',
      period: 'Last 30 days'
    },
    {
      id: 'virtual-transaction-inflow',
      title: 'Value of Virtual Transaction Inflow',
      value: '3,459',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    }
  ];
  
  // Secondary metrics
  export const secondaryMetrics: DashboardMetric[] = [
    {
      id: 'distinctive-vnubans',
      title: 'Distinctive Active vNUBANs',
      value: '11,989',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'pending-notifications',
      title: 'Total Amount Pending Merchant Notification',
      value: '₦4,789,008.00',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'successful-amount',
      title: 'Total Successful Amount Collected',
      value: '₦7,567,900,890.87',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'payouts-processed',
      title: 'Total Payouts Processed',
      value: '₦10,567,900,890.87',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    }
  ];
  
  // Chart data for Merchants vNUBAN Summary
  export const merchantsChartData: ChartDataPoint[] = [
    { month: 'Jan', value: 115000 },
    { month: 'Feb', value: 118000 },
    { month: 'Mar', value: 112000 },
    { month: 'Apr', value: 108000 },
    { month: 'May', value: 198007 },
    { month: 'Jun', value: 125000 },
    { month: 'Jul', value: 135000 },
    { month: 'Aug', value: 145000 },
    { month: 'Sep', value: 165000 },
    { month: 'Oct', value: 185000 },
    { month: 'Nov', value: 175000 },
    { month: 'Dec', value: 155000 }
  ];
  
  // Chart data for Transaction Flow
  export const transactionFlowData: ChartDataPoint[] = [
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 4500 },
    { month: 'Mar', value: 3200 },
    { month: 'Apr', value: 4800 },
    { month: 'May', value: 2800 },
    { month: 'Jun', value: 6100 },
    { month: 'Jul', value: 5200 },
    { month: 'Aug', value: 5800 },
    { month: 'Sep', value: 4600 },
    { month: 'Oct', value: 5400 },
    { month: 'Nov', value: 6200 },
    { month: 'Dec', value: 6800 }
  ];
  
  // Top merchants data
  export const topMerchants: MerchantData[] = [
    {
      id: '1',
      name: 'Stanley Mbaka .E.',
      email: 'stanleymbaka@gmail.com',
      amount: '₦16,015,900.00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '2',
      name: 'Kingsley Njoku .B.',
      email: 'njokukingsley@yahoo.com',
      amount: '₦13,997,060.00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '3',
      name: 'Fairefield .M. Wiston',
      email: 'fairefieldwiston@yahoo.com',
      amount: '₦10,870,000.00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '4',
      name: 'Mariah Kelly',
      email: 'mariahkelly.x@gmail.com',
      amount: '₦10,670,970.83',
      avatar: '/api/placeholder/32/32'
    }
  ];
  
  // Payout status data
  export const payoutData: PayoutData = {
    succeeded: 70970,
    failed: 1790,
    successAmount: '₦9,268,997,060.00',
    failedAmount: '₦1,790,900.00'
  };
  
  // Calculated rates
  export const payoutStats = {
    successRate: 95.67,
    failureRate: 4.33,
    total: payoutData.succeeded + payoutData.failed
  };

  export const transactionData = [
    {
      sN: 1,
      merchant: "Uchenna Mbaka Chibuenze",
      vNUBAN: "1234567890",
      amount: 15000,
      status: "Successful",
      transactionID: "TXN1234568904725527...",
      webhookStatus: "N/A",
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "uchenna.mbaka@gmail.com",
      sessionID: "SESS123456789",
      reference: "REF987654321",
      transactionType: "Payout",
      destination: { accountNumber: "0987654321", bank: "Access Bank", name: "Anthony Victor" },
      ipAddress: "192.168.1.1",
      deviceInfo: "Redmi A4 - Android",
      processingTime: "2.3 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 2,
      merchant: "Felix Babatunde Adebayo",
      vNUBAN: "5678901234",
      amount: 25000,
      status: "Failed",
      transactionID: "TXN9876543210859321...",
      webhookStatus: 200,
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "felix.adebayo@gmail.com",
      sessionID: "SESS987654321",
      reference: "REF123456789",
      transactionType: "Payout",
      destination: { accountNumber: "1122334455", bank: "GTBank", name: "Felix Adebayo" },
      ipAddress: "10.0.0.5",
      deviceInfo: "iPhone 12 - iOS",
      processingTime: "1.8 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 3,
      merchant: "Janine Felicia",
      vNUBAN: "1234567890",
      amount: 15000,
      status: "Successful",
      transactionID: "TXN4567891230859321...",
      webhookStatus: 200,
      timestamp: "25/06/04-03:17:37AM",
      action: "...",
      email: "janine.felicia@gmail.com",
      sessionID: "SESS456789123",
      reference: "REF567890123",
      transactionType: "Payout",
      destination: { accountNumber: "5566778899", bank: "Zenith Bank", name: "Janine Felicia" },
      ipAddress: "172.16.254.1",
      deviceInfo: "Samsung S10 - Android",
      processingTime: "2.1 seconds",
      lastUpdated: "25/06/04-03:18:37AM",
    },
    {
      sN: 4,
      merchant: "Marcus Bradley",
      vNUBAN: "5678901234",
      amount: 115000,
      status: "Successful",
      transactionID: "TXN7891234560859321...",
      webhookStatus: 200,
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "marcus.bradley@gmail.com",
      sessionID: "SESS789123456",
      reference: "REF147258369",
      transactionType: "Payout",
      destination: { accountNumber: "3344556677", bank: "First Bank", name: "Marcus Bradley" },
      ipAddress: "192.168.1.10",
      deviceInfo: "Huawei P30 - Android",
      processingTime: "2.5 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 5,
      merchant: "Antonio Mayeria",
      vNUBAN: "1178901234",
      amount: 15000,
      status: "Failed",
      transactionID: "TXN3216549870859321...",
      webhookStatus: "N/A",
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "antonio.mayeria@gmail.com",
      sessionID: "SESS321654987",
      reference: "REF369258147",
      transactionType: "Payout",
      destination: { accountNumber: "7788990011", bank: "UBA", name: "Antonio Mayeria" },
      ipAddress: "10.0.0.15",
      deviceInfo: "iPhone 11 - iOS",
      processingTime: "1.9 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 6,
      merchant: "Justina Janice",
      vNUBAN: "5678901009",
      amount: 25000,
      status: "Pending",
      transactionID: "TXN1478523690859321...",
      webhookStatus: "N/A",
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "justina.janice@gmail.com",
      sessionID: "SESS147852369",
      reference: "REF258147369",
      transactionType: "Payout",
      destination: { accountNumber: "1122334456", bank: "Access Bank", name: "Justina Janice" },
      ipAddress: "172.16.254.5",
      deviceInfo: "Samsung S20 - Android",
      processingTime: "2.0 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 7,
      merchant: "Sophia Okwuchi Anieche",
      vNUBAN: "1230087890",
      amount: 40000,
      status: "Failed",
      transactionID: "TXN3692581470859321...",
      webhookStatus: "N/A",
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "sophia.anieche@gmail.com",
      sessionID: "SESS369258147",
      reference: "REF741852963",
      transactionType: "Payout",
      destination: { accountNumber: "4455667788", bank: "GTBank", name: "Sophia Anieche" },
      ipAddress: "192.168.1.20",
      deviceInfo: "iPhone 13 - iOS",
      processingTime: "2.2 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 8,
      merchant: "Patrick Peterside",
      vNUBAN: "1234560001",
      amount: 16790,
      status: "Successful",
      transactionID: "TXN2581473690859321...",
      webhookStatus: 200,
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "patrick.peterside@gmail.com",
      sessionID: "SESS258147369",
      reference: "REF963852741",
      transactionType: "Payout",
      destination: { accountNumber: "6677889900", bank: "Zenith Bank", name: "Patrick Peterside" },
      ipAddress: "10.0.0.25",
      deviceInfo: "Redmi Note 10 - Android",
      processingTime: "2.4 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 9,
      merchant: "Henry Karvalei",
      vNUBAN: "2038901234",
      amount: 90000,
      status: "Pending",
      transactionID: "TXN7418529630859321...",
      webhookStatus: 400,
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "henry.karvalei@gmail.com",
      sessionID: "SESS741852963",
      reference: "REF147369258",
      transactionType: "Payout",
      destination: { accountNumber: "8899001122", bank: "First Bank", name: "Henry Karvalei" },
      ipAddress: "172.16.254.10",
      deviceInfo: "Huawei Mate 20 - Android",
      processingTime: "2.6 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 10,
      merchant: "Kingsley King",
      vNUBAN: "4898901003",
      amount: 67850,
      status: "Successful",
      transactionID: "TXN9638527410859321...",
      webhookStatus: 200,
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "kingsley.king@gmail.com",
      sessionID: "SESS963852741",
      reference: "REF369147258",
      transactionType: "Payout",
      destination: { accountNumber: "9900112233", bank: "UBA", name: "Kingsley King" },
      ipAddress: "192.168.1.15",
      deviceInfo: "iPhone 14 - iOS",
      processingTime: "2.3 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
    {
      sN: 11,
      merchant: "Kingsley King",
      vNUBAN: "4898901003",
      amount: 67850,
      status: "Pending",
      transactionID: "TXN8527419630859321...",
      webhookStatus: 200,
      timestamp: "25/06/04-03:17:37PM",
      action: "...",
      email: "kingsley.king@gmail.com",
      sessionID: "SESS852741963",
      reference: "REF258369147",
      transactionType: "Payout",
      destination: { accountNumber: "0011223344", bank: "Access Bank", name: "Kingsley King" },
      ipAddress: "10.0.0.30",
      deviceInfo: "Samsung S21 - Android",
      processingTime: "2.1 seconds",
      lastUpdated: "25/06/04-03:18:37PM",
    },
  ];

  export const vNUBANData = [
    { sN: 1, customerName: "Uchenna Mbabka", vNUBAN: "1234567890", status: "Active", productPrefix: "MED", type: "STATIC", createdAt: "25/06/04 03:17:37 PM", email: "uchenna.mbabka@gmail.com", creationIP: "192.168.1.1", deviceInfo: "Redmi A4+ Android", processingTime: "2.3 seconds" },
    { sN: 2, customerName: "Felix Adebayo", vNUBAN: "5678901234", status: "Inactive", productPrefix: "HEIRINSUR", type: "STATIC", createdAt: "25/06/04 03:17:37 PM", email: "felix.adebayo@gmail.com", creationIP: "192.168.1.2", deviceInfo: "Samsung Galaxy", processingTime: "1.8 seconds" },
    { sN: 3, customerName: "Janine Felicia", vNUBAN: "123467890", status: "Active", productPrefix: "MED", type: "DYNAMIC", createdAt: "25/06/04 03:17:37 AM", email: "janine.felicia@gmail.com", creationIP: "192.168.1.3", deviceInfo: "iPhone 12", processingTime: "2.0 seconds" },
    { sN: 4, customerName: "Marcus Bradley", vNUBAN: "5678901234", status: "Active", productPrefix: "MED", type: "STATIC", createdAt: "25/06/04 03:17:37 PM", email: "marcus.bradley@gmail.com", creationIP: "192.168.1.4", deviceInfo: "Redmi A4+ Android", processingTime: "2.5 seconds" },
    { sN: 5, customerName: "Anthonio Mayeria", vNUBAN: "1178901234", status: "Active", productPrefix: "HEIRINSUR", type: "DYNAMIC", createdAt: "25/06/04 03:17:37 PM", email: "anthonio.mayeria@gmail.com", creationIP: "192.168.1.5", deviceInfo: "Huawei P30", processingTime: "1.9 seconds" },
    { sN: 6, customerName: "Justina Janice", vNUBAN: "5678901009", status: "Inactive", productPrefix: "HEIRINSUR", type: "STATIC", createdAt: "25/06/04 03:17:37 PM", email: "justina.janice@gmail.com", creationIP: "192.168.1.6", deviceInfo: "iPhone 11", processingTime: "2.1 seconds" },
    { sN: 7, customerName: "Sophia Okwuchi", vNUBAN: "1230087890", status: "Active", productPrefix: "MED", type: "DYNAMIC", createdAt: "25/06/04 03:17:37 PM", email: "sophia.okwuchi@gmail.com", creationIP: "192.168.1.7", deviceInfo: "Redmi A4+ Android", processingTime: "2.4 seconds" },
    { sN: 8, customerName: "Patrick Peterside", vNUBAN: "1234560001", status: "Active", productPrefix: "HEIRINSUR", type: "STATIC", createdAt: "25/06/04 03:17:37 PM", email: "patrick.peterside@gmail.com", creationIP: "192.168.1.8", deviceInfo: "Samsung Galaxy", processingTime: "2.0 seconds" },
    { sN: 9, customerName: "Henry Karvalei", vNUBAN: "2038901234", status: "Active", productPrefix: "MED", type: "DYNAMIC", createdAt: "25/06/04 03:17:37 PM", email: "henry.karvalei@gmail.com", creationIP: "192.168.1.9", deviceInfo: "iPhone 13", processingTime: "2.2 seconds" },
    { sN: 10, customerName: "Kingsley King", vNUBAN: "4898901003", status: "Inactive", productPrefix: "MED", type: "STATIC", createdAt: "25/06/04 03:17:37 PM", email: "kingsley.king@gmail.com", creationIP: "192.168.1.10", deviceInfo: "Redmi A4+ Android", processingTime: "2.3 seconds" },
    { sN: 11, customerName: "Kingsley King", vNUBAN: "4898901003", status: "Inactive", productPrefix: "MED", type: "DYNAMIC", createdAt: "25/06/04 03:17:37 PM", email: "kingsley.king@gmail.com", creationIP: "192.168.1.10", deviceInfo: "Redmi A4+ Android", processingTime: "2.3 seconds" },
  ];

  export const staffData = [
    { sN: 1, fullName: "Aminu Bello", email: "aminu.bello@example.com", role: "Admin", status: "Enabled", lastLogin: "2025-07-09 10:15 AM WAT", ipAddress: "192.168.1.10", deviceInfo: "MacBook Pro", lastUpdated: "2025-07-09 10:00 AM WAT" },
    { sN: 2, fullName: "Chioma Okeke", email: "chioma.okeke@example.com", role: "Collections Team Member", status: "Disabled", lastLogin: "2025-07-08 03:30 PM WAT", ipAddress: "192.168.1.11", deviceInfo: "iPhone 14", lastUpdated: "2025-07-08 03:00 PM WAT" },
    { sN: 3, fullName: "Emeka Nwosu", email: "emeka.nwosu@example.com", role: "Super Admin", status: "Enabled", lastLogin: "2025-07-10 12:00 AM WAT", ipAddress: "192.168.1.12", deviceInfo: "Dell XPS", lastUpdated: "2025-07-10 12:00 AM WAT" },
    { sN: 4, fullName: "Fatima Yusuf", email: "fatima.yusuf@example.com", role: "Merchant Access Authorizer", status: "Enabled", lastLogin: "2025-07-09 09:45 AM WAT", ipAddress: "192.168.1.13", deviceInfo: "Samsung Galaxy", lastUpdated: "2025-07-09 09:30 AM WAT" },
    { sN: 5, fullName: "Ibrahim Sani", email: "ibrahim.sani@example.com", role: "Merchant Access Initiator", status: "Disabled", lastLogin: "2025-07-07 02:20 PM WAT", ipAddress: "192.168.1.14", deviceInfo: "Huawei P40", lastUpdated: "2025-07-07 02:00 PM WAT" },
    { sN: 6, fullName: "Joyce Adebayo", email: "joyce.adebayo@example.com", role: "Admin", status: "Enabled", lastLogin: "2025-07-09 11:00 AM WAT", ipAddress: "192.168.1.15", deviceInfo: "iPad Air", lastUpdated: "2025-07-09 10:45 AM WAT" },
    { sN: 7, fullName: "Kwame Mensah", email: "kwame.mensah@example.com", role: "Collections Team Member", status: "Disabled", lastLogin: "2025-07-06 01:10 PM WAT", ipAddress: "192.168.1.16", deviceInfo: "Lenovo ThinkPad", lastUpdated: "2025-07-06 01:00 PM WAT" },
    { sN: 8, fullName: "Lola Adegoke", email: "lola.adegoke@example.com", role: "Super Admin", status: "Enabled", lastLogin: "2025-07-10 01:30 AM WAT", ipAddress: "192.168.1.17", deviceInfo: "MacBook Air", lastUpdated: "2025-07-10 01:15 AM WAT" },
    { sN: 9, fullName: "Mustapha Ali", email: "mustapha.ali@example.com", role: "Merchant Access Authorizer", status: "Enabled", lastLogin: "2025-07-09 08:50 AM WAT", ipAddress: "192.168.1.18", deviceInfo: "Redmi Note 10", lastUpdated: "2025-07-09 08:30 AM WAT" },
    { sN: 10, fullName: "Ngozi Eze", email: "ngozi.eze@example.com", role: "Merchant Access Initiator", status: "Disabled", lastLogin: "2025-07-05 04:00 PM WAT", ipAddress: "192.168.1.19", deviceInfo: "Google Pixel", lastUpdated: "2025-07-05 03:45 PM WAT" },
    { sN: 11, fullName: "Oluwatobi James", email: "oluwatobi.james@example.com", role: "Admin", status: "Enabled", lastLogin: "2025-07-10 01:40 AM WAT", ipAddress: "192.168.1.20", deviceInfo: "Asus ZenBook", lastUpdated: "2025-07-10 01:30 AM WAT" },
  ];

  export const payoutsData = [
    { sN: 1, recipientName: "Aminu Bello", vNUBAN: "1234567890", amount: 50000, status: "Successful", payoutId: 101, dateRequested: "10 Jul 2025 01:00 AM WAT", transactionRef: "TRX-101", paymentReference: "PAY-101", merchantOrgId: "ORG-001", updatedAt: "10 Jul 2025 01:10 AM WAT" },
    { sN: 2, recipientName: "Chioma Okeke", vNUBAN: "9876543210", amount: 75000, status: "Processing", payoutId: 102, dateRequested: "09 Jul 2025 03:30 PM WAT", transactionRef: "TRX-102", paymentReference: "PAY-102", merchantOrgId: "ORG-002", updatedAt: "09 Jul 2025 03:40 PM WAT" },
    { sN: 3, recipientName: "Emeka Nwosu", vNUBAN: "4567891230", amount: 30000, status: "Failed", payoutId: 103, dateRequested: "08 Jul 2025 10:15 AM WAT", transactionRef: "TRX-103", paymentReference: "PAY-103", merchantOrgId: "ORG-003", updatedAt: "08 Jul 2025 10:20 AM WAT" },
    { sN: 4, recipientName: "Fatima Yusuf", vNUBAN: "7891234560", amount: 100000, status: "Successful", payoutId: 104, dateRequested: "07 Jul 2025 09:45 AM WAT", transactionRef: "TRX-104", paymentReference: "PAY-104", merchantOrgId: "ORG-004", updatedAt: "07 Jul 2025 09:50 AM WAT" },
    { sN: 5, recipientName: "Ibrahim Sani", vNUBAN: "3210987654", amount: 45000, status: "Processing", payoutId: 105, dateRequested: "06 Jul 2025 02:20 PM WAT", transactionRef: "TRX-105", paymentReference: "PAY-105", merchantOrgId: "ORG-005", updatedAt: "06 Jul 2025 02:25 PM WAT" },
    { sN: 6, recipientName: "Joyce Adebayo", vNUBAN: "6543217890", amount: 60000, status: "Failed", payoutId: 106, dateRequested: "05 Jul 2025 11:00 AM WAT", transactionRef: "TRX-106", paymentReference: "PAY-106", merchantOrgId: "ORG-006", updatedAt: "05 Jul 2025 11:05 AM WAT" },
    { sN: 7, recipientName: "Kwame Mensah", vNUBAN: "9870123456", amount: 80000, status: "Successful", payoutId: 107, dateRequested: "04 Jul 2025 01:10 PM WAT", transactionRef: "TRX-107", paymentReference: "PAY-107", merchantOrgId: "ORG-007", updatedAt: "04 Jul 2025 01:15 PM WAT" },
    { sN: 8, recipientName: "Lola Adegoke", vNUBAN: "1230987456", amount: 25000, status: "Processing", payoutId: 108, dateRequested: "03 Jul 2025 08:50 AM WAT", transactionRef: "TRX-108", paymentReference: "PAY-108", merchantOrgId: "ORG-008", updatedAt: "03 Jul 2025 08:55 AM WAT" },
    { sN: 9, recipientName: "Mustapha Ali", vNUBAN: "4567890321", amount: 90000, status: "Failed", payoutId: 109, dateRequested: "02 Jul 2025 04:00 PM WAT", transactionRef: "TRX-109", paymentReference: "PAY-109", merchantOrgId: "ORG-009", updatedAt: "02 Jul 2025 04:05 PM WAT" },
    { sN: 10, recipientName: "Ngozi Eze", vNUBAN: "7894561230", amount: 35000, status: "Successful", payoutId: 110, dateRequested: "01 Jul 2025 01:30 AM WAT", transactionRef: "TRX-110", paymentReference: "PAY-110", merchantOrgId: "ORG-010", updatedAt: "01 Jul 2025 01:35 AM WAT" },
    { sN: 11, recipientName: "Oluwatobi James", vNUBAN: "3216549870", amount: 70000, status: "Processing", payoutId: 111, dateRequested: "10 Jul 2025 01:53 AM WAT", transactionRef: "TRX-111", paymentReference: "PAY-111", merchantOrgId: "ORG-011", updatedAt: "10 Jul 2025 01:58 AM WAT" },
  ];

  export const apiLogsData = [
    {
      sN: 1,
      logId: "LG12345689047225527",
      merchantCode: "11345",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Uchenna Mbakka Chibueze",
      email: "uchenna.mbakka@gmail.com",
      transactionReference: "PYREFadgdq12353672",
      customerReference: "PYREFadgdq12353672",
      clientIP: "192.168.1.1",
      requestPayload: JSON.stringify({
        amount: 50000.0,
        currency: "NGN",
        service: "FT Single Credit",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010238",
        amount: 50000.0,
        currency: "NGN",
        message: "Transaction processed successfully",
        service: "FT Single Credit",
        timestamp: "2025-06-10T02:38:00Z",
        balance: 15000.00,
        error: null,
      }),
    },
    {
      sN: 2,
      logId: "LG98765432109876543",
      merchantCode: "20267",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Amina Bello",
      email: "amina.bello@yahoo.com",
      transactionReference: "PYREFxyz78901234",
      customerReference: "PYREFxyz78901234",
      clientIP: "192.168.1.2",
      requestPayload: JSON.stringify({
        amount: 30000.0,
        currency: "NGN",
        service: "FT Single Credit",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010239",
        amount: 30000.0,
        currency: "NGN",
        message: "Transaction processed successfully",
        service: "FT Single Credit",
        timestamp: "2025-06-10T02:38:01Z",
        balance: 20000.00,
        error: null,
      }),
    },
    {
      sN: 3,
      logId: "LG55555555555555555",
      merchantCode: "00986",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit Callback",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Chukwuma Okonkwo",
      email: "chukwuma.okonkwo@outlook.com",
      transactionReference: "PYREFabc12345678",
      customerReference: "PYREFabc12345678",
      clientIP: "192.168.1.3",
      requestPayload: JSON.stringify({
        amount: 45000.0,
        currency: "NGN",
        service: "FT Single Credit Callback",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010240",
        amount: 45000.0,
        currency: "NGN",
        message: "Callback processed successfully",
        service: "FT Single Credit Callback",
        timestamp: "2025-06-10T02:38:02Z",
        balance: 10000.00,
        error: null,
      }),
    },
    {
      sN: 4,
      logId: "LG44444444444444444",
      merchantCode: "34099",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Fatima Yusuf",
      email: "fatima.yusuf@gmail.com",
      transactionReference: "PYREFdef45678901",
      customerReference: "PYREFdef45678901",
      clientIP: "192.168.1.4",
      requestPayload: JSON.stringify({
        amount: 60000.0,
        currency: "NGN",
        service: "FT Single Credit",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010241",
        amount: 60000.0,
        currency: "NGN",
        message: "Transaction processed successfully",
        service: "FT Single Credit",
        timestamp: "2025-06-10T02:38:03Z",
        balance: 5000.00,
        error: null,
      }),
    },
    {
      sN: 5,
      logId: "LG33333333333333333",
      merchantCode: "12347",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Emeka Nwosu",
      email: "emeka.nwosu@hotmail.com",
      transactionReference: "PYREFghi78901234",
      customerReference: "PYREFghi78901234",
      clientIP: "192.168.1.5",
      requestPayload: JSON.stringify({
        amount: 25000.0,
        currency: "NGN",
        service: "FT Single Credit",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010242",
        amount: 25000.0,
        currency: "NGN",
        message: "Transaction processed successfully",
        service: "FT Single Credit",
        timestamp: "2025-06-10T02:38:04Z",
        balance: 30000.00,
        error: null,
      }),
    },
    {
      sN: 6,
      logId: "LG22222222222222222",
      merchantCode: "90866",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit",
      responseStatus: 403,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Hassan Ibrahim",
      email: "hassan.ibrahim@live.com",
      transactionReference: "PYREFjkl12345678",
      customerReference: "PYREFjkl12345678",
      clientIP: "192.168.1.6",
      requestPayload: JSON.stringify({
        amount: 40000.0,
        currency: "NGN",
        service: "FT Single Credit",
      }),
      responseBody: JSON.stringify({
        status: "error",
        error: "Forbidden access",
        message: "Authentication failed",
        timestamp: "2025-06-10T02:38:05Z",
      }),
    },
    {
      sN: 7,
      logId: "LG11111111111111111",
      merchantCode: "99763",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit Callback",
      responseStatus: 403,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Zainab Aliyu",
      email: "zainab.aliyu@gmail.com",
      transactionReference: "PYREFmno78901234",
      customerReference: "PYREFmno78901234",
      clientIP: "192.168.1.7",
      requestPayload: JSON.stringify({
        amount: 35000.0,
        currency: "NGN",
        service: "FT Single Credit Callback",
      }),
      responseBody: JSON.stringify({
        status: "error",
        error: "Forbidden access",
        message: "Authentication failed",
        timestamp: "2025-06-10T02:38:06Z",
      }),
    },
    {
      sN: 8,
      logId: "LG00000000000000000",
      merchantCode: "27556",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit",
      responseStatus: 503,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Tunde Adebayo",
      email: "tunde.adebayo@yahoo.com",
      transactionReference: "PYREFpqr12345678",
      customerReference: "PYREFpqr12345678",
      clientIP: "192.168.1.8",
      requestPayload: JSON.stringify({
        amount: 55000.0,
        currency: "NGN",
        service: "FT Single Credit",
      }),
      responseBody: JSON.stringify({
        status: "error",
        error: "Service unavailable",
        message: "Server down",
        timestamp: "2025-06-10T02:38:07Z",
      }),
    },
    {
      sN: 9,
      logId: "LG99999999999999999",
      merchantCode: "04735",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit Callback",
      responseStatus: 504,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Ngozi Eze",
      email: "ngozi.eze@outlook.com",
      transactionReference: "PYREFstu78901234",
      customerReference: "PYREFstu78901234",
      clientIP: "192.168.1.9",
      requestPayload: JSON.stringify({
        amount: 20000.0,
        currency: "NGN",
        service: "FT Single Credit Callback",
      }),
      responseBody: JSON.stringify({
        status: "error",
        error: "Gateway timeout",
        message: "Request timed out",
        timestamp: "2025-06-10T02:38:08Z",
      }),
    },
    {
      sN: 10,
      logId: "LG88888888888888888",
      merchantCode: "59330",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit Callback",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Kwame Osei",
      email: "kwame.osei@gmail.com",
      transactionReference: "PYREFvwx12345678",
      customerReference: "PYREFvwx12345678",
      clientIP: "192.168.1.10",
      requestPayload: JSON.stringify({
        amount: 10000.0,
        currency: "NGN",
        service: "FT Single Credit Callback",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010243",
        amount: 10000.0,
        currency: "NGN",
        message: "Callback processed successfully",
        service: "FT Single Credit Callback",
        timestamp: "2025-06-10T02:38:09Z",
        balance: 40000.00,
        error: null,
      }),
    },
    {
      sN: 11,
      logId: "LG77777777777777777",
      merchantCode: "59330",
      requestTimestamp: "25/06/04-03:17:37 PM",
      responseTimestamp: "25/06/04-03:17:37 PM",
      service: "FT Single Credit Callback",
      responseStatus: 200,
      timestamp: "25/06/04-03:17:37 PM",
      user: "Ayo Oladipo",
      email: "ayo.oladipo@hotmail.com",
      transactionReference: "PYREFyzx78901234",
      customerReference: "PYREFyzx78901234",
      clientIP: "192.168.1.11",
      requestPayload: JSON.stringify({
        amount: 15000.0,
        currency: "NGN",
        service: "FT Single Credit Callback",
      }),
      responseBody: JSON.stringify({
        status: "success",
        transaction_id: "TXN202506010244",
        amount: 15000.0,
        currency: "NGN",
        message: "Callback processed successfully",
        service: "FT Single Credit Callback",
        timestamp: "2025-06-10T02:38:10Z",
        balance: 35000.00,
        error: null,
      }),
    },
    // Add more entries as needed to reach 14,098
  ];

  export const auditData = [
    { sN: 1, staff: "Aminu Bello", activity: "User Login", description: "User Login (Succeeded)", status: "Succeeded", timestamp: "10 Jul 2025 02:00 AM WAT", userType: "Admin", merchantName: "Merchant A", merchantId: "M001" },
    { sN: 2, staff: "Chioma Okeke", activity: "Failed Login Attempt", description: "Failed Login Attempt (Failed)", status: "Failed", timestamp: "09 Jul 2025 03:45 PM WAT", userType: "Merchant User", merchantName: "Merchant B", merchantId: "M002" },
    { sN: 3, staff: "Emeka Nwosu", activity: "Profile Update", description: "Profile Update (Succeeded)", status: "Succeeded", timestamp: "08 Jul 2025 10:30 AM WAT", userType: "Super Admin", merchantName: "Merchant C", merchantId: "M003" },
    { sN: 4, staff: "Fatima Yusuf", activity: "User Logout", description: "User Logout (Succeeded)", status: "Succeeded", timestamp: "07 Jul 2025 09:50 AM WAT", userType: "Admin", merchantName: "Merchant D", merchantId: "M004" },
    { sN: 5, staff: "Ibrahim Sani", activity: "Role Assignment", description: "Role Assignment (Failed)", status: "Failed", timestamp: "06 Jul 2025 02:25 PM WAT", userType: "Merchant Access", merchantName: "Merchant E", merchantId: "M005" },
    { sN: 6, staff: "Joyce Adebayo", activity: "Merchant Creation", description: "Merchant Creation (Succeeded)", status: "Succeeded", timestamp: "05 Jul 2025 11:10 AM WAT", userType: "Super Admin", merchantName: "Merchant F", merchantId: "M006" },
    { sN: 7, staff: "Kwame Mensah", activity: "User Login", description: "User Login (Succeeded)", status: "Succeeded", timestamp: "04 Jul 2025 01:15 PM WAT", userType: "Admin", merchantName: "Merchant G", merchantId: "M007" },
    { sN: 8, staff: "Lola Adegoke", activity: "Failed Login Attempt", description: "Failed Login Attempt (Failed)", status: "Failed", timestamp: "03 Jul 2025 08:55 AM WAT", userType: "Merchant User", merchantName: "Merchant H", merchantId: "M008" },
    { sN: 9, staff: "Mustapha Ali", activity: "Profile Update", description: "Profile Update (Succeeded)", status: "Succeeded", timestamp: "02 Jul 2025 04:05 PM WAT", userType: "Super Admin", merchantName: "Merchant I", merchantId: "M009" },
    { sN: 10, staff: "Ngozi Eze", activity: "User Logout", description: "User Logout (Succeeded)", status: "Succeeded", timestamp: "01 Jul 2025 01:35 AM WAT", userType: "Admin", merchantName: "Merchant J", merchantId: "M010" },
    { sN: 11, staff: "Oluwatobi James", activity: "Role Assignment", description: "Role Assignment (Failed)", status: "Failed", timestamp: "10 Jul 2025 02:19 AM WAT", userType: "Merchant Access", merchantName: "Merchant K", merchantId: "M011" },
  ];

  export const customerData = [
  { sN: 1, customerName: "Aminu Bello", vnuban: "VN0012345678", status: "Active", totalValue: 5000.00, totalTransactions: 15, lastActivity: "04 Jul 2025 03:30 PM WAT" },
  { sN: 2, customerName: "Chioma Okeke", vnuban: "VN0012345679", status: "Inactive", totalValue: 1200.50, totalTransactions: 3, lastActivity: "03 Jul 2025 10:15 AM WAT" },
  { sN: 3, customerName: "Emeka Nwosu", vnuban: "VN0012345680", status: "Active", totalValue: 7500.75, totalTransactions: 25, lastActivity: "05 Jul 2025 01:45 PM WAT" },
  { sN: 4, customerName: "Fatima Yusuf", vnuban: "VN0012345681", status: "Active", totalValue: 3000.00, totalTransactions: 8, lastActivity: "06 Jul 2025 09:20 AM WAT" },
  { sN: 5, customerName: "Ibrahim Sani", vnuban: "VN0012345682", status: "Inactive", totalValue: 450.25, totalTransactions: 2, lastActivity: "02 Jul 2025 02:10 PM WAT" },
];

export const transactionData1 = [
  { sN: 1, amount: 1000.00, status: "Completed", transactionId: "TXN001", timestamp: "05 Jul 2025 01:45 PM WAT" },
  { sN: 2, amount: 500.50, status: "Pending", transactionId: "TXN002", timestamp: "04 Jul 2025 03:30 PM WAT" },
  { sN: 3, amount: 200.75, status: "Failed", transactionId: "TXN003", timestamp: "03 Jul 2025 10:15 AM WAT" },
  { sN: 4, amount: 750.00, status: "Completed", transactionId: "TXN004", timestamp: "06 Jul 2025 09:20 AM WAT" },
];

export const vnubanHistoryData1 = [
  { sN: 1, vnuban: "VN0012345678", status: "Active", totalTransactions: 10, totalValue: 3500.00, lastUsed: "05 Jul 2025 01:45 PM WAT", createdAt: "01 Jul 2025 09:00 AM WAT" },
  { sN: 2, vnuban: "VN0012345679", status: "Inactive", totalTransactions: 2, totalValue: 600.50, lastUsed: "03 Jul 2025 10:15 AM WAT", createdAt: "01 Jul 2025 09:05 AM WAT" },
];