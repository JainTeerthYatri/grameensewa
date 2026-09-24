import React, { useState, useEffect, useMemo } from 'react';
import { SupportedLanguage } from '../types';
import { KHATA_TEXT } from '../data/translations';
import { downloadBillPdfReceipt } from '../utils/generatePdfReceipt';

export interface BusinessProfile {
  businessName: string;
  ownerName: string;
  businessType: string;
  operatingSince?: string;
  phone: string;
  email?: string;
  address: string;
  villageOrCity: string;
  district: string;
  state: string;
  pincode?: string;
  upiId?: string;
  registrationNumber?: string;
  openingCash: number;
  registeredAt: string;
  isRegistered: boolean;
}

interface KhataScreenProps {
  onNavigate: (screen: any) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

// Data structures
interface KhataTransaction {
  id: string;
  date: string;
  type: 'give' | 'receive'; // 'give' = Maine Diya (Udhar/Debit), 'receive' = Mujhe Mila (Jama/Credit)
  amount: number;
  billNo?: string;
  note?: string;
  balanceAfter: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  village: string;
  creditLimit: number;
  netBalance: number; // > 0 = Udhar Baki (Customer owes you), < 0 = Advance Jama
  lastActivity: string;
  transactions: KhataTransaction[];
}

interface SupplierTransaction {
  id: string;
  date: string;
  type: 'purchase' | 'payment'; // purchase = Udhar Mal Aaya, payment = Dukandar ne Chukaya
  amount: number;
  invoiceNo?: string;
  note?: string;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  phone: string;
  netDue: number; // You owe them
  lastActivity: string;
  transactions: SupplierTransaction[];
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  unit: string;
}

interface Expense {
  id: string;
  time: string;
  title: string;
  category: string;
  amount: number;
}

interface BillItem {
  id?: string;
  itemId?: string;
  name: string;
  qty: number;
  unit: string;
  rate: number;
  amount: number;
}

// Optional demo seed data for rural/town dukandar testing (only loaded upon explicit request)
const SAMPLE_CUSTOMERS_DEMO: Customer[] = [
  {
    id: 'cust-1',
    name: 'Shri Ramswaroop Verma',
    phone: '9839120481',
    village: 'Rampur Kalan (Purva)',
    creditLimit: 15000,
    netBalance: 4250,
    lastActivity: 'Today, 10:15 AM',
    transactions: [
      { id: 'tx-101', date: '2026-09-20', type: 'give', amount: 3200, billNo: 'P-884', note: '2 Cans Cattle Feed & Mustard Oil 5L', balanceAfter: 3200 },
      { id: 'tx-102', date: '2026-09-22', type: 'receive', amount: 2000, note: 'Cash payment after milk sale', balanceAfter: 1200 },
      { id: 'tx-103', date: '2026-09-24', type: 'give', amount: 3050, billNo: 'P-912', note: 'Grocery ration: Sugar 10kg, Tea, Pulses', balanceAfter: 4250 },
    ],
  },
  {
    id: 'cust-2',
    name: 'Smt. Kamla Devi (SHG Leader)',
    phone: '9450381920',
    village: 'Gauriganj Tola',
    creditLimit: 25000,
    netBalance: 8600,
    lastActivity: 'Yesterday',
    transactions: [
      { id: 'tx-201', date: '2026-09-15', type: 'give', amount: 12000, billNo: 'P-840', note: 'Dairy stainless steel cans (4 nos)', balanceAfter: 12000 },
      { id: 'tx-202', date: '2026-09-18', type: 'receive', amount: 5000, note: 'UPI Transfer by SHG Group', balanceAfter: 7000 },
      { id: 'tx-203', date: '2026-09-23', type: 'give', amount: 1600, billNo: 'P-901', note: 'Milk testing chemicals & Lactometer', balanceAfter: 8600 },
    ],
  },
  {
    id: 'cust-3',
    name: 'Maheshwar Yadav (Dairy Farmer)',
    phone: '9129482711',
    village: 'Rampur Kalan (Dudhiya Tola)',
    creditLimit: 10000,
    netBalance: 1450,
    lastActivity: '2 days ago',
    transactions: [
      { id: 'tx-301', date: '2026-09-19', type: 'give', amount: 2450, billNo: 'P-869', note: 'Mineral Mixture & Salt Lick block', balanceAfter: 2450 },
      { id: 'tx-302', date: '2026-09-22', type: 'receive', amount: 1000, note: 'Cash deposit', balanceAfter: 1450 },
    ],
  },
  {
    id: 'cust-4',
    name: 'Panchayat Bhavan Canteen (Rajesh)',
    phone: '9792019482',
    village: 'Panchayat Complex',
    creditLimit: 30000,
    netBalance: 12400,
    lastActivity: 'Today, 08:30 AM',
    transactions: [
      { id: 'tx-401', date: '2026-09-10', type: 'give', amount: 15000, billNo: 'P-810', note: 'Monthly tea, coffee & biscuits supply', balanceAfter: 15000 },
      { id: 'tx-402', date: '2026-09-15', type: 'receive', amount: 8000, note: 'Bank transfer', balanceAfter: 7000 },
      { id: 'tx-403', date: '2026-09-24', type: 'give', amount: 5400, billNo: 'P-915', note: 'Gram Sabha refreshment stock', balanceAfter: 12400 },
    ],
  },
  {
    id: 'cust-5',
    name: 'Balram Maurya',
    phone: '9335198274',
    village: 'Mohanlalganj Road',
    creditLimit: 8000,
    netBalance: 0,
    lastActivity: '3 days ago',
    transactions: [
      { id: 'tx-501', date: '2026-09-18', type: 'give', amount: 1800, billNo: 'P-860', note: 'Ghee 2kg & Sugar', balanceAfter: 1800 },
      { id: 'tx-502', date: '2026-09-21', type: 'receive', amount: 1800, note: 'Full settlement via PhonePe', balanceAfter: 0 },
    ],
  },
];

const SAMPLE_SUPPLIERS_DEMO: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Amul Dairy Feed & Cattle Nutrition Agency',
    category: 'Cattle Feed / Dairy Supplies',
    phone: '9838029182',
    netDue: 18500,
    lastActivity: 'Yesterday',
    transactions: [
      { id: 'stx-1', date: '2026-09-15', type: 'purchase', amount: 35000, invoiceNo: 'INV-AM-441', note: '50 Bags Amul Dan & Bypass Protein' },
      { id: 'stx-2', date: '2026-09-21', type: 'payment', amount: 16500, note: 'NEFT Bank Transfer from GramMitra current ac' },
    ],
  },
  {
    id: 'sup-2',
    name: 'Shree Balaji Wholesale Grocery Mandi',
    category: 'Kirana FMCG & Spices',
    phone: '9415028471',
    netDue: 14200,
    lastActivity: '3 days ago',
    transactions: [
      { id: 'stx-3', date: '2026-09-18', type: 'purchase', amount: 28000, invoiceNo: 'SB-8821', note: 'Fortune Oil Tins, Sugar Bags, Pulses' },
      { id: 'stx-4', date: '2026-09-21', type: 'payment', amount: 13800, note: 'Cash payment to Mandi driver' },
    ],
  },
  {
    id: 'sup-3',
    name: 'Kisan Krishi Seva Kendra (Fertilizers & Seeds)',
    category: 'Agri Inputs / Silage bags',
    phone: '9129038472',
    netDue: 6500,
    lastActivity: '4 days ago',
    transactions: [
      { id: 'stx-5', date: '2026-09-16', type: 'purchase', amount: 12000, invoiceNo: 'KS-109', note: 'Silage bags and fodder seeds' },
      { id: 'stx-6', date: '2026-09-20', type: 'payment', amount: 5500, note: 'UPI Payment' },
    ],
  },
];

const SAMPLE_INVENTORY_DEMO: InventoryItem[] = [
  { id: 'inv-1', name: 'Amul Balanced Cattle Feed (50kg)', category: 'Dairy Feed', buyPrice: 1120, sellPrice: 1250, stock: 32, unit: 'Bags' },
  { id: 'inv-2', name: 'Mustard Oil Fortune Kachi Ghani (1L)', category: 'Kirana', buyPrice: 138, sellPrice: 155, stock: 45, unit: 'Pouches' },
  { id: 'inv-3', name: 'Refined Sugar / Chini M-30 (1kg)', category: 'Kirana', buyPrice: 38, sellPrice: 44, stock: 180, unit: 'kg' },
  { id: 'inv-4', name: 'Fresh Chilled Dairy Milk (Pouches)', category: 'Dairy', buyPrice: 48, sellPrice: 56, stock: 8, unit: 'Litres' },
  { id: 'inv-5', name: 'Mineral Mixture with Chelated Minerals (1kg)', category: 'Vet Medicine', buyPrice: 160, sellPrice: 210, stock: 15, unit: 'Packs' },
  { id: 'inv-6', name: 'Aashirvaad Shudh Chakki Atta (10kg)', category: 'Kirana', buyPrice: 365, sellPrice: 410, stock: 24, unit: 'Bags' },
  { id: 'inv-7', name: 'Tata Tea Gold (250g)', category: 'Kirana', buyPrice: 118, sellPrice: 135, stock: 30, unit: 'Packs' },
  { id: 'inv-8', name: 'Stainless Steel Milk Measure (1 Litre)', category: 'Hardware', buyPrice: 180, sellPrice: 240, stock: 5, unit: 'Pcs' },
];

export const KhataScreen: React.FC<KhataScreenProps> = ({
  onNavigate,
  currentLanguage,
  onSelectLanguage,
  onShowToast,
}) => {
  const t = KHATA_TEXT[currentLanguage] || KHATA_TEXT.en;

  // Active Tab state
  type TabKey = 'customers' | 'suppliers' | 'galla' | 'billing' | 'inventory' | 'analytics';
  const [activeTab, setActiveTab] = useState<TabKey>('customers');

  // Business Profile state from localStorage
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(() => {
    try {
      const saved = localStorage.getItem('gm_business_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Profile modal states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form states for business registration / edit
  const [regBusinessName, setRegBusinessName] = useState(businessProfile?.businessName || '');
  const [regOwnerName, setRegOwnerName] = useState(businessProfile?.ownerName || '');
  const [regBusinessType, setRegBusinessType] = useState(businessProfile?.businessType || 'Grocery & Kirana Store');
  const [regOperatingSince, setRegOperatingSince] = useState(businessProfile?.operatingSince || '2022');
  const [regPhone, setRegPhone] = useState(businessProfile?.phone || '');
  const [regAddress, setRegAddress] = useState(businessProfile?.address || '');
  const [regVillage, setRegVillage] = useState(businessProfile?.villageOrCity || '');
  const [regDistrict, setRegDistrict] = useState(businessProfile?.district || 'Lucknow');
  const [regState, setRegState] = useState(businessProfile?.state || 'Uttar Pradesh');
  const [regPincode, setRegPincode] = useState(businessProfile?.pincode || '226301');
  const [regUpiId, setRegUpiId] = useState(businessProfile?.upiId || '');
  const [regRegistrationNo, setRegRegistrationNo] = useState(businessProfile?.registrationNumber || '');
  const [regOpeningCash, setRegOpeningCash] = useState(String(businessProfile?.openingCash || 2000));

  // Load state from localStorage or initialize clean (0 data) for fresh businesses
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_customers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // If the storage contains the previous automatic dummy seed items, purge it to 0!
          const hasDummy = parsed.some((c: any) => c.id === 'cust-1' || c.id === 'cust-2');
          if (hasDummy) {
            localStorage.setItem('gm_khata_customers', JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_suppliers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasDummy = parsed.some((s: any) => s.id === 'sup-1' || s.id === 'sup-2');
          if (hasDummy) {
            localStorage.setItem('gm_khata_suppliers', JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_inventory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasDummy = parsed.some((i: any) => i.id === 'inv-1' || i.id === 'inv-2');
          if (hasDummy) {
            localStorage.setItem('gm_khata_inventory', JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Selected customer for detail view
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const selectedCustomer = useMemo(
    () => (selectedCustomerId ? customers.find((c) => c.id === selectedCustomerId) : customers[0]),
    [customers, selectedCustomerId]
  );

  // Customer filter & search
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerFilter, setCustomerFilter] = useState<'all' | 'udhar' | 'jama'>('all');

  // Supplier state
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const selectedSupplier = useMemo(
    () => (selectedSupplierId ? suppliers.find((s) => s.id === selectedSupplierId) : suppliers[0]),
    [suppliers, selectedSupplierId]
  );
  const [supplierSearch, setSupplierSearch] = useState('');

  // Daily Galla state - strictly calculated from user's registered opening cash + actual transactions
  const [openingGalla, setOpeningGalla] = useState<number>(() => {
    try {
      const savedProfile = localStorage.getItem('gm_business_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        return typeof p.openingCash === 'number' ? p.openingCash : 0;
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const [cashSalesToday, setCashSalesToday] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_cash_sales');
      if (saved === '8450') {
        localStorage.setItem('gm_khata_cash_sales', '0');
        return 0;
      }
      return saved ? parseFloat(saved) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [upiSalesToday, setUpiSalesToday] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_upi_sales');
      if (saved === '5120') {
        localStorage.setItem('gm_khata_upi_sales', '0');
        return 0;
      }
      return saved ? parseFloat(saved) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_expenses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasDummy = parsed.some((e: any) => e.id === 'exp-1' || e.id === 'exp-2');
          if (hasDummy) {
            localStorage.setItem('gm_khata_expenses', JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Denominations Counter state
  const [denominations, setDenominations] = useState<{ [key: number]: number }>(() => {
    try {
      const saved = localStorage.getItem('gm_khata_denominations');
      return saved ? JSON.parse(saved) : { 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 };
    } catch {
      return { 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 };
    }
  });

  // Quick Invoicing & Catalog state: clean 0 items initially!
  const [billCustomer, setBillCustomer] = useState<string>('walkin');
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [billPaymentMode, setBillPaymentMode] = useState<'cash' | 'upi' | 'khata'>('cash');
  const [billDiscount, setBillDiscount] = useState<string>('0');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [generatedBillReceipt, setGeneratedBillReceipt] = useState<any | null>(null);

  // Modals
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustVillage, setNewCustVillage] = useState('Rampur Kalan');
  const [newCustLimit, setNewCustLimit] = useState(15000);
  const [newCustInitialBalance, setNewCustInitialBalance] = useState(0);

  // Add Supplier Modal state
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [newSupName, setNewSupName] = useState('');
  const [newSupPhone, setNewSupPhone] = useState('');
  const [newSupCategory, setNewSupCategory] = useState('Wholesale Mandi');
  const [newSupInitialDue, setNewSupInitialDue] = useState('0');

  // Clear Ledger & Demo Modal states
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isLoadDemoOpen, setIsLoadDemoOpen] = useState(false);

  // Customer Transaction Modal
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [txType, setTxType] = useState<'give' | 'receive'>('give');
  const [txAmount, setTxAmount] = useState<string>('');
  const [txNote, setTxNote] = useState<string>('');
  const [txBillNo, setTxBillNo] = useState<string>('');

  // Supplier Transaction Modal
  const [isSupplierTxOpen, setIsSupplierTxOpen] = useState(false);
  const [supTxType, setSupTxType] = useState<'purchase' | 'payment'>('purchase');
  const [supTxAmount, setSupTxAmount] = useState<string>('');
  const [supTxInvoice, setSupTxInvoice] = useState<string>('');
  const [supTxNote, setSupTxNote] = useState<string>('');

  // Add Expense Modal
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Shop Expenses');
  const [expenseAmount, setExpenseAmount] = useState('');

  // Add Inventory Modal
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
  const [invName, setInvName] = useState('');
  const [invCategory, setInvCategory] = useState('Kirana');
  const [invBuyPrice, setInvBuyPrice] = useState('');
  const [invSellPrice, setInvSellPrice] = useState('');
  const [invStock, setInvStock] = useState('');
  const [invUnit, setInvUnit] = useState('Pcs');

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_customers', JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_suppliers', JSON.stringify(suppliers));
    } catch (e) {
      console.error(e);
    }
  }, [suppliers]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_inventory', JSON.stringify(inventory));
    } catch (e) {
      console.error(e);
    }
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_cash_sales', cashSalesToday.toString());
    } catch (e) {
      console.error(e);
    }
  }, [cashSalesToday]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_upi_sales', upiSalesToday.toString());
    } catch (e) {
      console.error(e);
    }
  }, [upiSalesToday]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_expenses', JSON.stringify(expenses));
    } catch (e) {
      console.error(e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_khata_denominations', JSON.stringify(denominations));
    } catch (e) {
      console.error(e);
    }
  }, [denominations]);

  // Key Totals Calculation
  const totalMarketUdhar = useMemo(() => {
    return customers.reduce((acc, c) => (c.netBalance > 0 ? acc + c.netBalance : acc), 0);
  }, [customers]);

  const totalMarketAdvance = useMemo(() => {
    return customers.reduce((acc, c) => (c.netBalance < 0 ? acc + Math.abs(c.netBalance) : acc), 0);
  }, [customers]);

  const totalSupplierDue = useMemo(() => {
    return suppliers.reduce((acc, s) => acc + s.netDue, 0);
  }, [suppliers]);

  const totalExpensesToday = useMemo(() => {
    return expenses.reduce((acc, e) => acc + e.amount, 0);
  }, [expenses]);

  const expectedGallaCash = useMemo(() => {
    return openingGalla + cashSalesToday - totalExpensesToday;
  }, [openingGalla, cashSalesToday, totalExpensesToday]);

  const totalDenominationCash = useMemo(() => {
    return Object.entries(denominations).reduce(
      (acc, [denom, count]) => acc + Number(denom) * Number(count || 0),
      0
    );
  }, [denominations]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.phone.includes(customerSearch) ||
        c.village.toLowerCase().includes(customerSearch.toLowerCase());
      if (!matchesSearch) return false;
      if (customerFilter === 'udhar') return c.netBalance > 0;
      if (customerFilter === 'jama') return c.netBalance <= 0;
      return true;
    });
  }, [customers, customerSearch, customerFilter]);

  // Filtered suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      return (
        s.name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
        s.phone.includes(supplierSearch) ||
        s.category.toLowerCase().includes(supplierSearch.toLowerCase())
      );
    });
  }, [suppliers, supplierSearch]);

  // Handle Add Customer
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) return;

    const newId = `cust-${Date.now()}`;
    const initialBal = Number(newCustInitialBalance) || 0;
    const initialTxs: KhataTransaction[] = initialBal !== 0
      ? [
          {
            id: `tx-init-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            type: initialBal > 0 ? 'give' : 'receive',
            amount: Math.abs(initialBal),
            note: 'Purani Baki (Opening Balance brought forward)',
            balanceAfter: initialBal,
          },
        ]
      : [];

    const newCust: Customer = {
      id: newId,
      name: newCustName.trim(),
      phone: newCustPhone.trim() || '9876543210',
      village: newCustVillage.trim() || 'Rampur Kalan',
      creditLimit: Number(newCustLimit) || 15000,
      netBalance: initialBal,
      lastActivity: 'Just now',
      transactions: initialTxs,
    };

    setCustomers((prev) => [newCust, ...prev]);
    setSelectedCustomerId(newId);
    setIsAddCustomerOpen(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustInitialBalance(0);
    onShowToast(`Customer account for ${newCust.name} created successfully!`, 'success');
  };

  // Handle Add New Supplier Account
  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupName.trim()) {
      onShowToast(
        currentLanguage === 'hi' ? 'कृपया सप्लायर का नाम दर्ज करें' : 'Please enter supplier / wholesaler name',
        'warning'
      );
      return;
    }

    const initDue = parseFloat(newSupInitialDue) || 0;
    const newId = `sup-${Date.now()}`;
    const initialTxs: SupplierTransaction[] =
      initDue > 0
        ? [
            {
              id: `stx-init-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              type: 'purchase',
              amount: initDue,
              note: 'Opening Credit Balance (पुराना बकाया माल)',
            },
          ]
        : [];

    const newSupplier: Supplier = {
      id: newId,
      name: newSupName.trim(),
      phone: newSupPhone.trim() || 'Not Provided',
      category: newSupCategory || 'Wholesale Mandi',
      netDue: initDue,
      lastActivity: 'Just added',
      transactions: initialTxs,
    };

    setSuppliers((prev) => [newSupplier, ...prev]);
    setSelectedSupplierId(newId);
    setIsAddSupplierOpen(false);
    setNewSupName('');
    setNewSupPhone('');
    setNewSupCategory('Wholesale Mandi');
    setNewSupInitialDue('0');
    onShowToast(
      currentLanguage === 'hi'
        ? `सप्लायर "${newSupplier.name}" खाता बही में जुड़ गया!`
        : `Supplier account for "${newSupplier.name}" created!`,
      'success'
    );
  };

  // Handle Customer Transaction Entry
  const handleAddCustomerTx = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(txAmount);
    if (!amt || amt <= 0 || !selectedCustomer) return;

    const newBalance =
      txType === 'give'
        ? selectedCustomer.netBalance + amt
        : selectedCustomer.netBalance - amt;

    const newTx: KhataTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: txType,
      amount: amt,
      billNo: txBillNo.trim() || undefined,
      note: txNote.trim() || (txType === 'give' ? 'Retail Goods / Ration on Credit' : 'Payment Received in Cash / UPI'),
      balanceAfter: newBalance,
    };

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === selectedCustomer.id) {
          return {
            ...c,
            netBalance: newBalance,
            lastActivity: 'Just now',
            transactions: [newTx, ...c.transactions],
          };
        }
        return c;
      })
    );

    // If receive payment in cash, optionally record to Galla
    if (txType === 'receive') {
      setCashSalesToday((prev) => prev + amt);
    }

    setIsAddTxOpen(false);
    setTxAmount('');
    setTxNote('');
    setTxBillNo('');
    onShowToast(
      `Khata updated: ₹${amt.toLocaleString('en-IN')} ${
        txType === 'give' ? 'added as Udhar' : 'received as Jama'
      }`,
      'success'
    );
  };

  // Handle WhatsApp Reminder
  const handleSendReminder = (customer: Customer) => {
    const textMsg =
      currentLanguage === 'hi'
        ? `नमस्ते ${customer.name} जी, आपकी दुकान "${t.defaultShopName}" पर कुल ₹${customer.netBalance.toLocaleString(
            'en-IN'
          )} की उधारी शेष है। कृपया शीघ्र भुगतान कर सहयोग करें। डिजिटल भुगतान हेतु धन्यवाद - ${t.defaultOwner}`
        : `Dear ${customer.name}, a polite reminder that an outstanding due of ₹${customer.netBalance.toLocaleString(
            'en-IN'
          )} is pending at ${t.defaultShopName}. Please settle at your earliest convenience. Thank you - ${t.defaultOwner}`;

    // Copy to clipboard and open WhatsApp
    navigator.clipboard.writeText(textMsg);
    onShowToast(`Reminder message copied! Opening WhatsApp for ${customer.phone}...`, 'info');

    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(textMsg)}`, '_blank');
  };

  // Handle Supplier Transaction
  const handleAddSupplierTx = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(supTxAmount);
    if (!amt || amt <= 0 || !selectedSupplier) return;

    const newDue =
      supTxType === 'purchase'
        ? selectedSupplier.netDue + amt
        : selectedSupplier.netDue - amt;

    const newTx: SupplierTransaction = {
      id: `stx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: supTxType,
      amount: amt,
      invoiceNo: supTxInvoice.trim() || undefined,
      note: supTxNote.trim() || (supTxType === 'purchase' ? 'Stock received on Credit' : 'Payment made to supplier'),
    };

    setSuppliers((prev) =>
      prev.map((s) => {
        if (s.id === selectedSupplier.id) {
          return {
            ...s,
            netDue: newDue,
            lastActivity: 'Just now',
            transactions: [newTx, ...s.transactions],
          };
        }
        return s;
      })
    );

    // If payment made to supplier in cash, record in expenses
    if (supTxType === 'payment') {
      setExpenses((prev) => [
        {
          id: `exp-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: `Supplier Payment: ${selectedSupplier.name}`,
          category: 'Supplier Due',
          amount: amt,
        },
        ...prev,
      ]);
    }

    setIsSupplierTxOpen(false);
    setSupTxAmount('');
    setSupTxInvoice('');
    setSupTxNote('');
    onShowToast(`Supplier khata updated: ₹${amt.toLocaleString('en-IN')}`, 'success');
  };

  // Handle Record Expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expenseAmount);
    if (!amt || amt <= 0) return;

    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: expenseTitle.trim() || 'Daily Shop Expense',
      category: expenseCategory,
      amount: amt,
    };

    setExpenses((prev) => [newExp, ...prev]);
    setIsAddExpenseOpen(false);
    setExpenseTitle('');
    setExpenseAmount('');
    onShowToast(`Expense of ₹${amt.toLocaleString('en-IN')} recorded in Galla!`, 'info');
  };

  // Catalog filter and selection logic
  const catalogCategories = useMemo(() => {
    const cats = Array.from(new Set(inventory.map((i) => i.category)));
    return ['all', ...cats];
  }, [inventory]);

  const catalogItems = useMemo(() => {
    return inventory.filter((item) => {
      const matchesCategory = catalogCategory === 'all' || item.category === catalogCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(catalogSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [inventory, catalogCategory, catalogSearch]);

  // Handle Add / Select Item from Catalog (Automatic Bill & Quantity Addition)
  const handleSelectCatalogItem = (item: InventoryItem) => {
    setBillItems((prev) => {
      const existingIdx = prev.findIndex((bi) => bi.itemId === item.id || bi.name.toLowerCase() === item.name.toLowerCase());
      if (existingIdx > -1) {
        // Automatically increment quantity by 1
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = Number(existing.qty || 0) + 1;
        const newAmt = Math.round(newQty * Number(existing.rate || 0));
        updated[existingIdx] = {
          ...existing,
          qty: newQty,
          amount: newAmt,
        };
        onShowToast(`Updated ${item.name} quantity to ${newQty} (₹${newAmt})`, 'info');
        return updated;
      } else {
        // Automatically add item to bill with rate and amount prefilled
        const newItem: BillItem = {
          itemId: item.id,
          name: item.name,
          qty: 1,
          unit: item.unit || 'Pcs',
          rate: item.sellPrice,
          amount: item.sellPrice,
        };
        onShowToast(`Added 1x ${item.name} (₹${item.sellPrice}) to bill`, 'success');
        return [...prev, newItem];
      }
    });
  };

  // Adjust item quantity (+ / -)
  const handleAdjustBillItemQty = (index: number, delta: number) => {
    setBillItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      const newQty = Math.max(0, Number(item.qty || 0) + delta);
      if (newQty === 0) {
        return prev.filter((_, i) => i !== index);
      }
      item.qty = newQty;
      item.amount = Math.round(newQty * Number(item.rate || 0));
      updated[index] = item;
      return updated;
    });
  };

  // Handle Add Custom Item not in Catalog
  const handleAddBillItem = () => {
    setBillItems((prev) => [
      ...prev,
      { name: 'Custom Store Item', qty: 1, unit: 'Pcs', rate: 50, amount: 50 },
    ]);
  };

  const handleUpdateBillItem = (index: number, field: keyof BillItem, value: any) => {
    setBillItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'rate') {
        const q = parseFloat(item.qty as any) || 0;
        const r = parseFloat(item.rate as any) || 0;
        item.amount = Math.round(q * r);
      }
      updated[index] = item;
      return updated;
    });
  };

  const handleRemoveBillItem = (index: number) => {
    setBillItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearBill = () => {
    if (billItems.length === 0) return;
    setBillItems([]);
    setBillDiscount('0');
    onShowToast('Bill cleared!', 'info');
  };

  // Automatic Money Calculations
  const billSubtotal = useMemo(() => {
    return billItems.reduce((acc, item) => acc + (item.amount || 0), 0);
  }, [billItems]);

  const billDiscountNum = useMemo(() => {
    return Math.max(0, parseFloat(billDiscount) || 0);
  }, [billDiscount]);

  const billTotalAmount = useMemo(() => {
    return Math.max(0, billSubtotal - billDiscountNum);
  }, [billSubtotal, billDiscountNum]);

  const billTotalQty = useMemo(() => {
    return billItems.reduce((acc, item) => acc + Number(item.qty || 0), 0);
  }, [billItems]);

  // Handle Generate Bill
  const handleGenerateBill = () => {
    if (billItems.length === 0 || billTotalAmount <= 0) {
      onShowToast('Please select at least one item from catalog with valid quantity and rate', 'warning');
      return;
    }

    const billNumber = `GM-BILL-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const billDate = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const billTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let customerName = 'Counter Walk-in Customer';
    let customerPhone = '';
    let customerVillage = '';
    let previousBalance: number | undefined;
    let newBalance: number | undefined;

    if (billCustomer !== 'walkin') {
      const cust = customers.find((c) => c.id === billCustomer);
      if (cust) {
        customerName = cust.name;
        customerPhone = cust.phone;
        customerVillage = cust.village;
        previousBalance = cust.netBalance;

        // If payment mode is 'khata', post directly to customer's account!
        if (billPaymentMode === 'khata') {
          const updatedBal = cust.netBalance + billTotalAmount;
          newBalance = updatedBal;
          const newTx: KhataTransaction = {
            id: `tx-${Date.now()}`,
            date: now.toISOString().split('T')[0],
            type: 'give',
            amount: billTotalAmount,
            billNo: billNumber,
            note: `Express Bill: ${billItems.map((i) => `${i.name} (x${i.qty})`).join(', ')}`,
            balanceAfter: updatedBal,
          };

          setCustomers((prev) =>
            prev.map((c) =>
              c.id === cust.id
                ? {
                    ...c,
                    netBalance: updatedBal,
                    lastActivity: 'Just now',
                    transactions: [newTx, ...c.transactions],
                  }
                : c
            )
          );
        }
      }
    }

    // If paid by cash, add to Galla
    if (billPaymentMode === 'cash') {
      setCashSalesToday((prev) => prev + billTotalAmount);
    } else if (billPaymentMode === 'upi') {
      setUpiSalesToday((prev) => prev + billTotalAmount);
    }

    // Auto reduce stock in inventory
    setInventory((prev) =>
      prev.map((inv) => {
        const matched = billItems.find(
          (bi) => bi.itemId === inv.id || bi.name.toLowerCase() === inv.name.toLowerCase()
        );
        if (matched) {
          const deducted = Math.max(0, inv.stock - (Number(matched.qty) || 0));
          return { ...inv, stock: deducted };
        }
        return inv;
      })
    );

    // Set generated bill receipt object
    const receipt = {
      billNumber,
      billDate,
      billTime,
      customerName,
      customerPhone,
      customerVillage,
      paymentMode: billPaymentMode,
      items: [...billItems],
      subtotal: billSubtotal,
      discount: billDiscountNum,
      total: billTotalAmount,
      previousBalance,
      newBalance,
    };
    setGeneratedBillReceipt(receipt);
    onShowToast(`Bill ${billNumber} generated! You can download PDF or share on WhatsApp.`, 'success');
  };

  // Handle Download PDF Receipt
  const handleDownloadPdf = (receiptData?: any) => {
    const target = receiptData || generatedBillReceipt;
    if (!target) {
      onShowToast('Please generate the bill first', 'warning');
      return;
    }

    try {
      downloadBillPdfReceipt({
        billNumber: target.billNumber,
        billDate: target.billDate,
        billTime: target.billTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customerName: target.customerName,
        customerPhone: target.customerPhone,
        customerVillage: target.customerVillage,
        paymentMode: target.paymentMode,
        items: target.items,
        subtotal: target.subtotal || target.total,
        discount: target.discount || 0,
        total: target.total,
        previousBalance: target.previousBalance,
        newBalance: target.newBalance,
        shopName: businessProfile?.businessName || t.defaultShopName,
        shopOwner: businessProfile?.ownerName || t.defaultOwner,
        shopLocation: businessProfile ? `${businessProfile.villageOrCity}, ${businessProfile.district}` : t.shopLocation,
      });
      onShowToast(`PDF Receipt ${target.billNumber}.pdf downloaded!`, 'success');
    } catch (err) {
      console.error('PDF error:', err);
      onShowToast('Could not generate PDF receipt', 'warning');
    }
  };

  // Add Inventory Item
  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName.trim()) return;

    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: invName.trim(),
      category: invCategory,
      buyPrice: parseFloat(invBuyPrice) || 0,
      sellPrice: parseFloat(invSellPrice) || 0,
      stock: parseFloat(invStock) || 0,
      unit: invUnit,
    };

    setInventory((prev) => [newItem, ...prev]);
    setIsAddInventoryOpen(false);
    setInvName('');
    setInvBuyPrice('');
    setInvSellPrice('');
    setInvStock('');
    onShowToast(`Item "${newItem.name}" added to stock inventory!`, 'success');
  };

  // Handle Register Business
  const handleRegisterBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regBusinessName.trim()) {
      onShowToast(
        currentLanguage === 'hi'
          ? 'कृपया अपनी दुकान या व्यवसाय का नाम दर्ज करें'
          : 'Please enter your business or store name',
        'warning'
      );
      return;
    }
    if (!regOwnerName.trim()) {
      onShowToast(
        currentLanguage === 'hi'
          ? 'कृपया प्रोप्राइटर / मालिक का नाम दर्ज करें'
          : 'Please enter owner / proprietor name',
        'warning'
      );
      return;
    }
    if (!regPhone.trim()) {
      onShowToast(
        currentLanguage === 'hi'
          ? 'कृपया प्राथमिक मोबाइल नंबर दर्ज करें'
          : 'Please enter primary contact number',
        'warning'
      );
      return;
    }
    if (!regVillage.trim()) {
      onShowToast(
        currentLanguage === 'hi'
          ? 'कृपया गांव या शहर का नाम दर्ज करें'
          : 'Please enter village or town name',
        'warning'
      );
      return;
    }

    const openingCashNum = parseFloat(regOpeningCash) || 0;
    const profile: BusinessProfile = {
      businessName: regBusinessName.trim(),
      ownerName: regOwnerName.trim(),
      businessType: regBusinessType,
      operatingSince: regOperatingSince.trim() || new Date().getFullYear().toString(),
      phone: regPhone.trim(),
      address: regAddress.trim() || 'Main Market Road',
      villageOrCity: regVillage.trim(),
      district: regDistrict.trim() || 'Lucknow',
      state: regState.trim() || 'Uttar Pradesh',
      pincode: regPincode.trim() || '',
      upiId: regUpiId.trim() || `${regPhone.trim()}@upi`,
      registrationNumber: regRegistrationNo.trim() || 'REG-PENDING',
      openingCash: openingCashNum,
      registeredAt: new Date().toISOString(),
      isRegistered: true,
    };

    localStorage.setItem('gm_business_profile', JSON.stringify(profile));
    setBusinessProfile(profile);
    setOpeningGalla(openingCashNum);

    // Guaranteed Clean 0 start for newly registered business
    setCustomers([]);
    localStorage.setItem('gm_khata_customers', JSON.stringify([]));
    setSuppliers([]);
    localStorage.setItem('gm_khata_suppliers', JSON.stringify([]));
    setInventory([]);
    localStorage.setItem('gm_khata_inventory', JSON.stringify([]));
    setCashSalesToday(0);
    localStorage.setItem('gm_khata_cash_sales', '0');
    setUpiSalesToday(0);
    localStorage.setItem('gm_khata_upi_sales', '0');
    setExpenses([]);
    localStorage.setItem('gm_khata_expenses', JSON.stringify([]));
    setDenominations({ 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 });
    localStorage.setItem('gm_khata_denominations', JSON.stringify({ 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 }));
    setBillItems([]);
    setSelectedCustomerId('');
    setSelectedSupplierId('');

    onShowToast(
      currentLanguage === 'hi'
        ? `व्यवसाय "${profile.businessName}" का पंजीकरण सफल रहा! बही-खाता ₹0 से प्रारंभ है।`
        : `Business "${profile.businessName}" registered successfully! Ledger starting clean at ₹0.`,
      'success'
    );
  };

  // Handle Update Profile
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regBusinessName.trim() || !regOwnerName.trim() || !regPhone.trim()) {
      onShowToast(
        currentLanguage === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all required fields',
        'warning'
      );
      return;
    }

    const updatedProfile: BusinessProfile = {
      businessName: regBusinessName.trim(),
      ownerName: regOwnerName.trim(),
      businessType: regBusinessType,
      operatingSince: regOperatingSince.trim() || (businessProfile?.operatingSince || '2022'),
      phone: regPhone.trim(),
      address: regAddress.trim() || (businessProfile?.address || 'Main Market Road'),
      villageOrCity: regVillage.trim() || (businessProfile?.villageOrCity || 'Town'),
      district: regDistrict.trim() || (businessProfile?.district || 'District'),
      state: regState.trim() || (businessProfile?.state || 'State'),
      pincode: regPincode.trim(),
      upiId: regUpiId.trim() || `${regPhone.trim()}@upi`,
      registrationNumber: regRegistrationNo.trim() || (businessProfile?.registrationNumber || 'REGISTERED'),
      openingCash: parseFloat(regOpeningCash) || (businessProfile?.openingCash || 0),
      registeredAt: businessProfile?.registeredAt || new Date().toISOString(),
      isRegistered: true,
    };

    localStorage.setItem('gm_business_profile', JSON.stringify(updatedProfile));
    setBusinessProfile(updatedProfile);
    setIsEditProfileOpen(false);
    onShowToast(
      currentLanguage === 'hi' ? 'व्यवसाय प्रोफ़ाइल अपडेट कर दी गई है' : 'Business profile updated successfully!',
      'success'
    );
  };

  // Handle Clear Ledger to 0
  const handleClearLedger = () => {
    setCustomers([]);
    localStorage.setItem('gm_khata_customers', JSON.stringify([]));
    setSuppliers([]);
    localStorage.setItem('gm_khata_suppliers', JSON.stringify([]));
    setCashSalesToday(0);
    localStorage.setItem('gm_khata_cash_sales', '0');
    setUpiSalesToday(0);
    localStorage.setItem('gm_khata_upi_sales', '0');
    setExpenses([]);
    localStorage.setItem('gm_khata_expenses', JSON.stringify([]));
    setDenominations({ 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 });
    localStorage.setItem('gm_khata_denominations', JSON.stringify({ 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 }));
    setBillItems([]);
    setSelectedCustomerId('');
    setSelectedSupplierId('');
    setIsClearConfirmOpen(false);
    onShowToast(
      currentLanguage === 'hi'
        ? 'बही-खाता पूरी तरह से साफ़ कर दिया गया है। कुल बिक्री व उधारी ₹0 से पुनः प्रारंभ है!'
        : 'All ledger data cleared! Accounts, sales, and dues reset to ₹0.',
      'info'
    );
  };

  // Handle Reset Business Registration
  const handleResetRegistration = () => {
    localStorage.removeItem('gm_business_profile');
    localStorage.removeItem('gm_khata_customers');
    localStorage.removeItem('gm_khata_suppliers');
    localStorage.removeItem('gm_khata_inventory');
    localStorage.removeItem('gm_khata_cash_sales');
    localStorage.removeItem('gm_khata_upi_sales');
    localStorage.removeItem('gm_khata_expenses');
    localStorage.removeItem('gm_khata_denominations');
    setCustomers([]);
    setSuppliers([]);
    setInventory([]);
    setCashSalesToday(0);
    setUpiSalesToday(0);
    setExpenses([]);
    setDenominations({ 500: 0, 200: 0, 100: 0, 50: 0, 20: 0, 10: 0 });
    setBillItems([]);
    setSelectedCustomerId('');
    setSelectedSupplierId('');
    setBusinessProfile(null);
    setIsResetConfirmOpen(false);
    setIsEditProfileOpen(false);
    onShowToast(
      currentLanguage === 'hi' ? 'व्यवसाय पंजीकरण और बही-खाता रीसेट कर दिया गया है' : 'Business registration and ledger reset.',
      'info'
    );
  };

  // Handle Load Demo Practice Data (Optional for testing)
  const handleLoadSampleData = () => {
    setCustomers(SAMPLE_CUSTOMERS_DEMO);
    setSuppliers(SAMPLE_SUPPLIERS_DEMO);
    setInventory(SAMPLE_INVENTORY_DEMO);
    setCashSalesToday(4200);
    setUpiSalesToday(1800);
    setIsLoadDemoOpen(false);
    onShowToast(
      currentLanguage === 'hi'
        ? 'अभ्यास हेतु डेमो खाते लोड कर दिए गए हैं (आप कभी भी रीसेट कर सकते हैं)'
        : 'Sample practice accounts loaded! You can clear to ₹0 anytime.',
      'info'
    );
  };

  // Handle Load Starter Inventory items into catalog
  const handleLoadStarterInventory = () => {
    setInventory(SAMPLE_INVENTORY_DEMO);
    onShowToast(
      currentLanguage === 'hi'
        ? 'दुकान के सामान्य किराना व डेयरी सामान स्टॉक में जोड़ दिए गए हैं'
        : 'Common Kirana & Dairy goods added to inventory catalog!',
      'success'
    );
  };

  // If business is not registered yet, display Business Registration Screen
  if (!businessProfile || !businessProfile.isRegistered) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Navigation & Language Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-variant">
          <button
            onClick={() => onNavigate('gateway')}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>{currentLanguage === 'hi' ? 'मुख्य पृष्ठ पर वापस' : 'Back to Main Portal'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Language / भाषा:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onSelectLanguage?.('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage?.('hi')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  currentLanguage === 'hi'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Business Registration Card */}
        <div className="bg-white rounded-3xl border border-surface-variant shadow-md overflow-hidden">
          {/* Header Bar with Tricolor Accent */}
          <div className="h-2 flex">
            <div className="w-1/3 bg-[#FF9933]"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-[#138808]"></div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Header info */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">storefront</span>
                <span>{currentLanguage === 'hi' ? 'चरण 1: व्यवसाय पंजीकरण' : 'Step 1: Business Registration & Profile Setup'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {currentLanguage === 'hi'
                  ? 'अपनी दुकान / व्यवसाय का पंजीकरण करें'
                  : 'Register Your Business Profile'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'डिजिटल बही-खाता, ग्राहक उधारी-जमा, स्टॉक और ऑटोमैटिक बिलिंग शुरू करने से पहले कृपया अपने व्यवसाय का विवरण भरें। यह जानकारी आपकी सभी रसीदों, चालान और व्हाट्सएप्प संदेशों पर दिखाई देगी।'
                  : 'Before accessing your digital ledger, customer accounts, and automated billing, please complete your store registration. These details will appear on all your official PDF receipts, bills, and WhatsApp notifications.'}
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegisterBusiness} className="space-y-8">
              {/* Section 1: Business Identity */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <span className="material-symbols-outlined text-primary text-lg">badge</span>
                  <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                    {currentLanguage === 'hi' ? '1. दुकान व मालिक की पहचान' : '1. Store & Proprietor Identity'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                      <span>{currentLanguage === 'hi' ? 'दुकान / व्यवसाय का नाम' : 'Business / Store Name'} *</span>
                      <span className="text-[11px] text-stone-400 font-normal">Printed on official bills</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regBusinessName}
                      onChange={(e) => setRegBusinessName(e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'उदा. वर्मा जनरल स्टोर व डेयरी' : 'e.g., Verma General Store & Provisions'}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'मालिक / प्रोप्राइटर का नाम' : 'Proprietor / Owner Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regOwnerName}
                      onChange={(e) => setRegOwnerName(e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'उदा. लालू यादव' : 'e.g., Lalu Yadav'}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'व्यवसाय का प्रकार / श्रेणी' : 'Business Category'} *
                    </label>
                    <select
                      value={regBusinessType}
                      onChange={(e) => setRegBusinessType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm bg-white"
                    >
                      <option value="Grocery & Kirana Store">Grocery & Kirana Store (किराना व प्रोविजन)</option>
                      <option value="Dairy & Milk Center">Dairy & Milk Center (डेयरी व दुग्ध संकलन)</option>
                      <option value="Agri Inputs & Fertilizers">Agri Inputs & Fertilizers (कृषि सेवा व खाद-बीज)</option>
                      <option value="Cattle Feed & Animal Nutrition">Cattle Feed & Animal Nutrition (पशु आहार व पोषण)</option>
                      <option value="Hardware & Tools">Hardware & Tools (हार्डवेयर व औजार)</option>
                      <option value="Veterinary & Pharmacy">Veterinary & Pharmacy (दवा व पशु चिकित्सा)</option>
                      <option value="General Retail Store">General Retail Store (जनरल रिटेल स्टोर)</option>
                      <option value="Other Commercial Enterprise">Other Commercial Enterprise (अन्य व्यवसाय)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'शुरुआत का वर्ष (Established)' : 'Established Year'}
                    </label>
                    <input
                      type="text"
                      value={regOperatingSince}
                      onChange={(e) => setRegOperatingSince(e.target.value)}
                      placeholder="2022"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact & Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <span className="material-symbols-outlined text-primary text-lg">pin_drop</span>
                  <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                    {currentLanguage === 'hi' ? '2. संपर्क व दुकान का पता' : '2. Contact & Store Location'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'प्राथमिक मोबाइल नंबर (व्हाट्सएप्प)' : 'Mobile Number (WhatsApp)'} *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9839120481"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'बाजार / दुकान का पता' : 'Shop Address / Market'}
                    </label>
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'उदा. मुख्य बाजार, मंदिर के पास' : 'e.g., Main Market, Near Bus Stand'}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'गांव / कस्बा / शहर' : 'Village / Town'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regVillage}
                      onChange={(e) => setRegVillage(e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'उदा. मोहनलालगंज' : 'e.g., Mohanlalganj'}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'जिला' : 'District'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regDistrict}
                      onChange={(e) => setRegDistrict(e.target.value)}
                      placeholder="Lucknow"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'राज्य' : 'State'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      placeholder="Uttar Pradesh"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'पिन कोड' : 'PIN Code'}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={regPincode}
                      onChange={(e) => setRegPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="226301"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payments & Legal Identifiers */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <span className="material-symbols-outlined text-primary text-lg">payments</span>
                  <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                    {currentLanguage === 'hi' ? '3. डिजिटल भुगतान व पंजीकरण (वैकल्पिक)' : '3. Digital Payments & Identification (Optional)'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'दुकान की UPI ID (QR रसीद हेतु)' : 'Shop UPI ID (for QR receipts)'}
                    </label>
                    <input
                      type="text"
                      value={regUpiId}
                      onChange={(e) => setRegUpiId(e.target.value)}
                      placeholder="business@upi"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'उद्यम / जीएसटी / व्यापार लाइसेंस' : 'Udyam / GST / Reg. Number'}
                    </label>
                    <input
                      type="text"
                      value={regRegistrationNo}
                      onChange={(e) => setRegRegistrationNo(e.target.value)}
                      placeholder="UDYAM-UP-28-0091823"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800">
                      {currentLanguage === 'hi' ? 'सुबह का शुरुआती गल्ला (रोकड़ ₹)' : 'Initial Morning Cash in Drawer (₹)'}
                    </label>
                    <input
                      type="number"
                      value={regOpeningCash}
                      onChange={(e) => setRegOpeningCash(e.target.value)}
                      placeholder="2000"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-primary focus:ring-1 focus:ring-primary outline-hidden text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-700">100% Private & Locally Saved.</span> You can edit or change these details anytime.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">how_to_reg</span>
                  <span>
                    {currentLanguage === 'hi'
                      ? 'पंजीकरण पूरा करें व खाता शुरू करें'
                      : 'Register Business & Launch Khata'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Bar with Language Selector and Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-surface-variant">
        <button
          onClick={() => onNavigate('gateway')}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>{currentLanguage === 'hi' ? 'मुख्य पृष्ठ पर वापस' : 'Back to Main Portal'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">Language / भाषा:</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelectLanguage?.('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                currentLanguage === 'en'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onSelectLanguage?.('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                currentLanguage === 'hi'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Sovereign Shopkeeper Banner */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-[#17381c] via-[#0f2412] to-[#1a3d20] text-white shadow-xl relative overflow-hidden border border-[#2e5e34]">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff9933] text-stone-900 font-extrabold text-[10px] tracking-wide uppercase">
                {businessProfile?.businessType || 'Retail Enterprise'}
              </span>
              <span className="text-xs text-white/70">
                Reg: {businessProfile?.registrationNumber || 'Registered'}
              </span>
              {businessProfile?.upiId && (
                <span className="text-xs text-amber-300 font-mono">
                  UPI: {businessProfile.upiId}
                </span>
              )}
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold tracking-tight">
              {businessProfile?.businessName || t.defaultShopName}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl">
              {businessProfile?.ownerName || t.defaultOwner} • {businessProfile ? `${businessProfile.villageOrCity}, ${businessProfile.district} (${businessProfile.state})` : t.shopLocation}
              {businessProfile?.phone ? ` • Tel: ${businessProfile.phone}` : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (businessProfile) {
                  setRegBusinessName(businessProfile.businessName);
                  setRegOwnerName(businessProfile.ownerName);
                  setRegBusinessType(businessProfile.businessType);
                  setRegOperatingSince(businessProfile.operatingSince || '2022');
                  setRegPhone(businessProfile.phone);
                  setRegAddress(businessProfile.address);
                  setRegVillage(businessProfile.villageOrCity);
                  setRegDistrict(businessProfile.district);
                  setRegState(businessProfile.state);
                  setRegPincode(businessProfile.pincode || '');
                  setRegUpiId(businessProfile.upiId || '');
                  setRegRegistrationNo(businessProfile.registrationNumber || '');
                  setRegOpeningCash(String(businessProfile.openingCash || 2000));
                }
                setIsEditProfileOpen(true);
              }}
              className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">settings</span>
              <span>{currentLanguage === 'hi' ? 'प्रोफ़ाइल बदलें' : 'Edit Business Profile'}</span>
            </button>
            <button
              onClick={() => setIsClearConfirmOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-rose-900/40 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              title="Clear all records and reset ledger to ₹0"
            >
              <span className="material-symbols-outlined text-sm">cleaning_services</span>
              <span>{currentLanguage === 'hi' ? 'खाता ₹0 करें' : 'Clear to ₹0'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('billing');
                onShowToast(currentLanguage === 'hi' ? 'त्वरित पर्ची / बिलिंग काउंटर' : 'Switched to Quick Parchi & Bill Counter', 'info');
              }}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">receipt_long</span>
              <span>{currentLanguage === 'hi' ? '+ त्वरित पर्ची / बिल' : '+ Quick Parchi / Bill'}</span>
            </button>
            <button
              onClick={() => {
                setIsAddCustomerOpen(true);
              }}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-white/90 text-[#0f2412] font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>{currentLanguage === 'hi' ? '+ नया ग्राहक' : '+ Add Customer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Real-time Business KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Udhar to Collect */}
        <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-rose-700 font-bold">
            <span>{t.metrics.toCollect}</span>
            <span className="material-symbols-outlined text-rose-600">call_received</span>
          </div>
          <div className="text-2xl font-black text-rose-600">
            ₹{totalMarketUdhar.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-rose-100">
            <span>{customers.filter((c) => c.netBalance > 0).length} Customers with Dues</span>
            <span className="text-emerald-700 font-bold">
              Advance: ₹{totalMarketAdvance.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Metric 2: Supplier Payables */}
        <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
            <span>{t.metrics.toPay}</span>
            <span className="material-symbols-outlined text-amber-600">local_shipping</span>
          </div>
          <div className="text-2xl font-black text-amber-700">
            ₹{totalSupplierDue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-amber-100">
            <span>{suppliers.length} Mandi Wholesalers</span>
            <span className="text-primary font-bold">Credit Cycle: 15 Days</span>
          </div>
        </div>

        {/* Metric 3: Today's Total Sales */}
        <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-blue-700 font-bold">
            <span>{t.metrics.todaySales}</span>
            <span className="material-symbols-outlined text-blue-600">trending_up</span>
          </div>
          <div className="text-2xl font-black text-blue-700">
            ₹{(cashSalesToday + upiSalesToday).toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-blue-100">
            <span>Cash: ₹{cashSalesToday.toLocaleString('en-IN')}</span>
            <span className="text-emerald-700 font-bold">UPI: ₹{upiSalesToday.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Metric 4: Galla Cash in Drawer */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-bold">
            <span>{t.metrics.cashInGalla}</span>
            <span className="material-symbols-outlined text-emerald-600">point_of_sale</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            ₹{expectedGallaCash.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-emerald-100">
            <span>Counted Cash: ₹{totalDenominationCash.toLocaleString('en-IN')}</span>
            <span
              className={`font-bold ${
                totalDenominationCash === expectedGallaCash ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {totalDenominationCash === expectedGallaCash ? '✓ Tallied' : 'Pending Count'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-surface-container-high overflow-x-auto scrollbar-none border border-surface-variant">
        <button
          onClick={() => setActiveTab('customers')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'customers'
              ? 'bg-white text-primary shadow-xs'
              : 'text-outline hover:text-on-surface hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">groups</span>
          <span>{t.tabs.customers}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
            {customers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'suppliers'
              ? 'bg-white text-primary shadow-xs'
              : 'text-outline hover:text-on-surface hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">storefront</span>
          <span>{t.tabs.suppliers}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            {suppliers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('galla')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'galla'
              ? 'bg-white text-primary shadow-xs'
              : 'text-outline hover:text-on-surface hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">payments</span>
          <span>{t.tabs.galla}</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'billing'
              ? 'bg-white text-primary shadow-xs'
              : 'text-outline hover:text-on-surface hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">receipt_long</span>
          <span>{t.tabs.billing}</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-white text-primary shadow-xs'
              : 'text-outline hover:text-on-surface hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">inventory_2</span>
          <span>{t.tabs.inventory}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
            {inventory.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-white text-primary shadow-xs'
              : 'text-outline hover:text-on-surface hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">query_stats</span>
          <span>{t.tabs.analytics}</span>
        </button>
      </div>

      {/* ================================================================ */}
      {/* TAB 1: CUSTOMER KHATA (जमा-उधार बही खाता) */}
      {/* ================================================================ */}
      {activeTab === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Customer List & Search (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-surface-variant shadow-xs space-y-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">
                  search
                </span>
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder={t.customers.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-variant bg-surface-container-low text-xs font-medium focus:outline-hidden focus:bg-white focus:border-primary"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setCustomerFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    customerFilter === 'all'
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-container-low text-outline hover:bg-surface-container'
                  }`}
                >
                  {t.customers.filterAll} ({customers.length})
                </button>
                <button
                  onClick={() => setCustomerFilter('udhar')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    customerFilter === 'udhar'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  {t.customers.filterUdhar} ({customers.filter((c) => c.netBalance > 0).length})
                </button>
                <button
                  onClick={() => setCustomerFilter('jama')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    customerFilter === 'jama'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {t.customers.filterJama}
                </button>
              </div>
            </div>

            {/* Customers Scrollable List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredCustomers.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-stone-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-2xl">person_off</span>
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 text-xs sm:text-sm">
                      {currentLanguage === 'hi' ? 'कोई ग्राहक खाता नहीं है' : 'No Customers Added Yet'}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5 max-w-xs mx-auto">
                      {currentLanguage === 'hi'
                        ? 'आपका खाता रजिस्टर पूरी तरह से नया और स्वच्छ है। कुल उधारी ₹0 है।'
                        : 'Your ledger starts completely clean at ₹0. Add customers when sales or credit occur.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddCustomerOpen(true)}
                    className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-container transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    <span>{currentLanguage === 'hi' ? '+ नया ग्राहक जोड़ें' : '+ Add Customer'}</span>
                  </button>
                </div>
              ) : (
                filteredCustomers.map((cust) => {
                  const isSelected = cust.id === selectedCustomerId;
                  const isUdhar = cust.netBalance > 0;
                  const isSettled = cust.netBalance === 0;

                  return (
                    <button
                      key={cust.id}
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary'
                          : 'bg-white border-surface-variant hover:border-outline/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                            isUdhar
                              ? 'bg-rose-100 text-rose-700'
                              : isSettled
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {cust.name.slice(0, 1)}
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs sm:text-sm text-on-surface flex items-center gap-1.5">
                            <span>{cust.name}</span>
                          </div>
                          <div className="text-[11px] text-outline flex items-center gap-1">
                            <span>{cust.village}</span>
                            <span>•</span>
                            <span className="font-mono">{cust.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div
                          className={`text-sm font-black ${
                            isUdhar
                              ? 'text-rose-600'
                              : isSettled
                              ? 'text-gray-500'
                              : 'text-emerald-600'
                          }`}
                        >
                          ₹{Math.abs(cust.netBalance).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-outline">
                          {isUdhar ? 'Udhar Baki' : isSettled ? 'Chukta' : 'Advance'}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Selected Customer Detailed Bahi-Khata Ledger (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedCustomer ? (
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-6">
                {/* Customer Ledger Header Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-variant">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                      {selectedCustomer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-base sm:text-lg text-on-surface">
                        {selectedCustomer.name}
                      </h2>
                      <div className="text-xs text-outline flex items-center gap-2">
                        <span>{selectedCustomer.village}</span>
                        <span>•</span>
                        <a
                          href={`tel:${selectedCustomer.phone}`}
                          className="font-mono text-primary hover:underline font-bold"
                        >
                          {selectedCustomer.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Send WhatsApp Reminder & Call */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSendReminder(selectedCustomer)}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                      title="Send WhatsApp payment reminder"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>WhatsApp तकादा</span>
                    </button>
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="p-2 rounded-xl border border-surface-variant hover:bg-surface-container text-outline hover:text-on-surface transition-all cursor-pointer"
                      title="Print Customer Statement"
                    >
                      <span className="material-symbols-outlined text-base">print</span>
                    </button>
                  </div>
                </div>

                {/* Net Balance & Credit Limit Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-surface-container-low border border-surface-variant">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline block">
                      Current Net Balance
                    </span>
                    <span
                      className={`text-xl font-black ${
                        selectedCustomer.netBalance > 0
                          ? 'text-rose-600'
                          : selectedCustomer.netBalance === 0
                          ? 'text-gray-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      ₹{Math.abs(selectedCustomer.netBalance).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold block text-outline">
                      {selectedCustomer.netBalance > 0
                        ? t.customers.netUdhar
                        : selectedCustomer.netBalance === 0
                        ? t.customers.allSettled
                        : t.customers.netAdvance}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline block">
                      Approved Credit Limit
                    </span>
                    <span className="text-xl font-black text-on-surface">
                      ₹{selectedCustomer.creditLimit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-outline block">
                      Available: ₹
                      {Math.max(
                        0,
                        selectedCustomer.creditLimit - selectedCustomer.netBalance
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline block">
                      Last Entry Date
                    </span>
                    <span className="text-sm font-bold text-on-surface">
                      {selectedCustomer.lastActivity}
                    </span>
                    <span className="text-[10px] text-primary font-bold block">
                      {selectedCustomer.transactions.length} Total Vouchers
                    </span>
                  </div>
                </div>

                {/* Big Two Entry Buttons: Maine Diya vs Mujhe Mila */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setTxType('give');
                      setIsAddTxOpen(true);
                    }}
                    className="py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_downward</span>
                    <span>{t.customers.giveCreditBtn}</span>
                  </button>

                  <button
                    onClick={() => {
                      setTxType('receive');
                      setIsAddTxOpen(true);
                    }}
                    className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_upward</span>
                    <span>{t.customers.receivePaymentBtn}</span>
                  </button>
                </div>

                {/* Transaction Ledger Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                    <span>{t.customers.transactionHistory}</span>
                    <span className="text-[11px] text-outline font-normal">
                      Red = Udhar Diya • Green = Jama Mila
                    </span>
                  </div>

                  <div className="border border-surface-variant rounded-2xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-surface-container-high border-b border-surface-variant font-bold text-outline text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Date & Bill</th>
                          <th className="py-2.5 px-3">Description / Item</th>
                          <th className="py-2.5 px-3 text-right">You Gave (₹)</th>
                          <th className="py-2.5 px-3 text-right">You Got (₹)</th>
                          <th className="py-2.5 px-3 text-right">Net Baki</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant">
                        {selectedCustomer.transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-bold text-on-surface">{tx.date}</div>
                              {tx.billNo && (
                                <span className="font-mono text-[10px] text-primary">
                                  #{tx.billNo}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-on-surface">
                              <div>{tx.note || '-'}</div>
                            </td>
                            <td className="py-3 px-3 text-right font-black text-rose-600">
                              {tx.type === 'give' ? `₹${tx.amount.toLocaleString('en-IN')}` : '-'}
                            </td>
                            <td className="py-3 px-3 text-right font-black text-emerald-600">
                              {tx.type === 'receive' ? `₹${tx.amount.toLocaleString('en-IN')}` : '-'}
                            </td>
                            <td className="py-3 px-3 text-right font-bold font-mono text-on-surface">
                              ₹{tx.balanceAfter.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center bg-white rounded-3xl border border-surface-variant shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">calculate</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-stone-900">
                    {currentLanguage === 'hi' ? 'बही-खाता रजिस्टर तैयार है (कुल उधारी: ₹0)' : 'Bahi-Khata Ledger Ready (Total Udhar: ₹0)'}
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                    {currentLanguage === 'hi'
                      ? 'आपकी बिक्री व उधारी अभी ₹0 से प्रारंभ है। जैसे ही आप किसी ग्राहक को माल उधार देंगे या नकद भुगतान दर्ज करेंगे, कंप्यूटर स्वतः गणना करके कुल उधारी अपडेट कर देगा।'
                      : 'Your sales and customer dues start clean at ₹0. Once you add customers, create bills, or record transactions, the computer calculates and updates all totals in real time.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => setIsAddCustomerOpen(true)}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    <span>{currentLanguage === 'hi' ? '+ पहला ग्राहक जोड़ें' : '+ Add First Customer'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                    <span>{currentLanguage === 'hi' ? '+ पर्ची / बिल बनाएं' : '+ Quick Bill'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 2: SUPPLIER KHATA (सप्लायर बही खाता) */}
      {/* ================================================================ */}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Supplier List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-surface-variant shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="font-bold text-xs text-on-surface">Wholesaler / Supplier Accounts</span>
                <button
                  onClick={() => setIsAddSupplierOpen(true)}
                  className="py-1 px-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-sm">add_business</span>
                  <span>{currentLanguage === 'hi' ? '+ नया सप्लायर' : '+ Add Supplier'}</span>
                </button>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">
                  search
                </span>
                <input
                  type="text"
                  value={supplierSearch}
                  onChange={(e) => setSupplierSearch(e.target.value)}
                  placeholder={t.suppliers.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-variant bg-surface-container-low text-xs font-medium focus:outline-hidden focus:bg-white focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-outline">
                <span>{filteredSuppliers.length} Authorized Wholesalers</span>
                <span className="font-bold text-amber-800">
                  Total Payable: ₹{totalSupplierDue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredSuppliers.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border-2 border-dashed border-stone-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 text-xs sm:text-sm">
                      {currentLanguage === 'hi' ? 'कोई सप्लायर खाता नहीं है' : 'No Suppliers Registered'}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5 max-w-xs mx-auto">
                      {currentLanguage === 'hi'
                        ? 'मंडी के थोक विक्रेता या एजेंसी को यहाँ जोड़ें। कुल देय राशि अभी ₹0 है।'
                        : 'Register mandi distributors or wholesale dealers. Total payable is ₹0.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddSupplierOpen(true)}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add_business</span>
                    <span>{currentLanguage === 'hi' ? '+ नया सप्लायर जोड़ें' : '+ Add Supplier'}</span>
                  </button>
                </div>
              ) : (
                filteredSuppliers.map((sup) => {
                  const isSelected = sup.id === selectedSupplierId;
                  return (
                    <button
                      key={sup.id}
                      onClick={() => setSelectedSupplierId(sup.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-600 shadow-xs ring-1 ring-amber-600'
                          : 'bg-white border-surface-variant hover:border-outline/40'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs sm:text-sm text-on-surface">
                          {sup.name}
                        </div>
                        <div className="text-[11px] text-outline flex items-center gap-1.5">
                          <span className="px-1.5 py-0.2 rounded-sm bg-surface-container-high text-on-surface text-[10px]">
                            {sup.category}
                          </span>
                          <span>•</span>
                          <span className="font-mono">{sup.phone}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black text-amber-700">
                          ₹{sup.netDue.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-outline">
                          Payable (देना है)
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Supplier Details & Ledger (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedSupplier ? (
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-variant">
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] mb-1">
                      {selectedSupplier.category}
                    </div>
                    <h2 className="font-bold text-base sm:text-lg text-on-surface">
                      {selectedSupplier.name}
                    </h2>
                    <div className="text-xs text-outline font-mono">
                      Contact: {selectedSupplier.phone}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-outline block">
                      Total Payable Outstanding
                    </span>
                    <span className="text-2xl font-black text-amber-700">
                      ₹{selectedSupplier.netDue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Supplier Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSupTxType('purchase');
                      setIsSupplierTxOpen(true);
                    }}
                    className="py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    <span>{t.suppliers.recordPurchase}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSupTxType('payment');
                      setIsSupplierTxOpen(true);
                    }}
                    className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    <span>{t.suppliers.recordPayment}</span>
                  </button>
                </div>

                {/* Supplier Transactions Table */}
                <div className="space-y-3">
                  <div className="font-bold text-xs text-on-surface">
                    Purchase Invoices & Payments History
                  </div>

                  <div className="border border-surface-variant rounded-2xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-surface-container-high border-b border-surface-variant font-bold text-outline text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Date & Invoice</th>
                          <th className="py-2.5 px-3">Particulars</th>
                          <th className="py-2.5 px-3 text-right">Credit Purchase (₹)</th>
                          <th className="py-2.5 px-3 text-right">Payment Made (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant">
                        {selectedSupplier.transactions.map((stx) => (
                          <tr key={stx.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-bold text-on-surface">{stx.date}</div>
                              {stx.invoiceNo && (
                                <span className="font-mono text-[10px] text-amber-700">
                                  #{stx.invoiceNo}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-on-surface">
                              {stx.note || '-'}
                            </td>
                            <td className="py-3 px-3 text-right font-black text-amber-700">
                              {stx.type === 'purchase'
                                ? `₹${stx.amount.toLocaleString('en-IN')}`
                                : '-'}
                            </td>
                            <td className="py-3 px-3 text-right font-black text-emerald-600">
                              {stx.type === 'payment'
                                ? `₹${stx.amount.toLocaleString('en-IN')}`
                                : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center bg-white rounded-3xl border border-surface-variant shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">storefront</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-stone-900">
                    {currentLanguage === 'hi' ? 'सप्लायर खाता रजिस्टर तैयार है (कुल देय: ₹0)' : 'Wholesaler Register Ready (Total Due: ₹0)'}
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                    {currentLanguage === 'hi'
                      ? 'मंडी के थोक व्यापारियों व डिस्ट्रीब्यूटरों का बही-खाता जोड़ने के लिए नीचे दिए गए बटन पर क्लिक करें। अभी कुल देय राशि ₹0 है।'
                      : 'Register mandi wholesalers and suppliers to track goods received on credit and payments settled. Currently ₹0.'}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setIsAddSupplierOpen(true)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">add_business</span>
                    <span>{currentLanguage === 'hi' ? '+ नया सप्लायर जोड़ें' : '+ Add Supplier'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 3: DAILY GALLA & CASHBOOK (दुकान का गल्ला) */}
      {/* ================================================================ */}
      {activeTab === 'galla' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Galla Summary & Cash Inflow/Outflow (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
                <div>
                  <h2 className="font-bold text-base sm:text-lg text-on-surface">
                    {t.galla.title}
                  </h2>
                  <p className="text-xs text-outline">{t.galla.subtitle}</p>
                </div>
                <button
                  onClick={() => setIsAddExpenseOpen(true)}
                  className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">remove_circle</span>
                  <span>{t.galla.recordExpense}</span>
                </button>
              </div>

              {/* Galla Flow Formula Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-1">
                  <span className="text-[10px] font-bold text-outline block">
                    {t.galla.openingBalance}
                  </span>
                  <div className="text-base font-black text-on-surface">
                    ₹{openingGalla.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-outline">Drawer at 07:00 AM</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 block">
                    + {t.galla.cashSales}
                  </span>
                  <div className="text-base font-black text-emerald-700">
                    ₹{cashSalesToday.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-emerald-600">Physical Cash In</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                  <span className="text-[10px] font-bold text-rose-800 block">
                    - {t.galla.cashExpenses}
                  </span>
                  <div className="text-base font-black text-rose-700">
                    ₹{totalExpensesToday.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-rose-600">{expenses.length} Cash Outflows</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/30 space-y-1">
                  <span className="text-[10px] font-bold text-primary block">
                    = {t.galla.closingCash}
                  </span>
                  <div className="text-base font-black text-primary">
                    ₹{expectedGallaCash.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[9px] text-primary/80">Must Match Drawer</span>
                </div>
              </div>

              {/* Digital UPI Collection Note */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-700 text-xl">qr_code_scanner</span>
                  <div>
                    <div className="text-xs font-bold text-blue-900">
                      QR / UPI Online Collections (Direct Bank Credit)
                    </div>
                    <div className="text-[11px] text-blue-700">
                      Credited directly into Bank of Baroda Current Account
                    </div>
                  </div>
                </div>
                <div className="text-base font-black text-blue-800">
                  ₹{upiSalesToday.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Today's Expenses List */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                  <span>Today's Cash Expenditures (दुकान के खर्चे)</span>
                  <span className="text-rose-600 font-black">
                    Total: ₹{totalExpensesToday.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="divide-y divide-surface-variant border border-surface-variant rounded-2xl overflow-hidden">
                  {expenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3 flex items-center justify-between hover:bg-surface-container-low transition-colors text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-on-surface">{exp.title}</div>
                        <div className="text-[10px] text-outline flex items-center gap-2">
                          <span className="px-1.5 py-0.2 rounded-sm bg-surface-container-high">
                            {exp.category}
                          </span>
                          <span>•</span>
                          <span>{exp.time}</span>
                        </div>
                      </div>
                      <div className="font-bold text-rose-600 text-sm">
                        - ₹{exp.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Currency Denominations Counter (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">calculate</span>
                  <h3 className="font-bold text-sm text-on-surface">
                    {t.galla.notesCounter}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    onShowToast('Physical Galla cash count verified and locked for the day!', 'success');
                  }}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Verify Drawer
                </button>
              </div>

              <p className="text-[11px] text-outline">
                Enter the count of each physical currency note in the drawer to tally against the expected book balance:
              </p>

              {/* Denomination Inputs */}
              <div className="space-y-2">
                {[500, 200, 100, 50, 20, 10].map((note) => {
                  const count = denominations[note] || 0;
                  const lineTotal = note * count;
                  return (
                    <div
                      key={note}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl bg-surface-container-low border border-surface-variant text-xs"
                    >
                      <span className="font-mono font-bold text-on-surface w-16">₹{note} x</span>
                      <input
                        type="number"
                        min="0"
                        value={count === 0 ? '' : count}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setDenominations((prev) => ({ ...prev, [note]: val }));
                        }}
                        placeholder="0"
                        className="w-20 text-center py-1 rounded-lg border border-surface-variant bg-white font-mono font-bold text-xs focus:outline-hidden focus:border-primary"
                      />
                      <span className="font-mono font-bold text-right text-on-surface w-24">
                        = ₹{lineTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Tally Comparison Box */}
              <div className="p-4 rounded-2xl bg-surface-container-high border border-surface-variant space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-outline">Expected Book Cash:</span>
                  <span className="font-mono font-bold text-on-surface">
                    ₹{expectedGallaCash.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-outline">Physical Counted Cash:</span>
                  <span className="font-mono font-bold text-primary text-sm">
                    ₹{totalDenominationCash.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pt-2 border-t border-surface-variant flex items-center justify-between text-xs font-bold">
                  <span>Variance / Farq (अंतर):</span>
                  <span
                    className={
                      totalDenominationCash - expectedGallaCash === 0
                        ? 'text-emerald-600'
                        : totalDenominationCash - expectedGallaCash > 0
                        ? 'text-blue-600'
                        : 'text-rose-600'
                    }
                  >
                    {totalDenominationCash - expectedGallaCash === 0
                      ? '✓ Perfect Match (₹0)'
                      : totalDenominationCash - expectedGallaCash > 0
                      ? `+ ₹${Math.abs(totalDenominationCash - expectedGallaCash)} Extra`
                      : `- ₹${Math.abs(totalDenominationCash - expectedGallaCash)} Shortage`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 4: QUICK PARCHI, CATALOG SELECTOR & PDF RECEIPT (कच्चा/पक्का बिल) */}
      {/* ================================================================ */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* Top Section: Store Product Catalog for 1-Tap Item Selection */}
          <div className="p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-variant">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                  <h2 className="font-bold text-base sm:text-lg text-on-surface">
                    {t.billing.itemsCatalog || 'दुकान का सामान कैटलॉग (Store Items Catalog)'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    1-Tap Auto Bill & Qty
                  </span>
                </div>
                <p className="text-xs text-outline mt-0.5">
                  Click or tap any item to automatically add it to the bill. Clicking multiple times automatically increases its quantity and recalculates the total money!
                </p>
              </div>

              {/* Catalog Search & Category Filters */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-base">
                    search
                  </span>
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search item or category..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-surface-variant bg-surface-container-low text-xs focus:outline-hidden focus:bg-white focus:border-primary"
                  />
                  {catalogSearch && (
                    <button
                      type="button"
                      onClick={() => setCatalogSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {catalogCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCatalogCategory(cat)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    catalogCategory === cat
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-container-low hover:bg-surface-container text-outline hover:text-on-surface border border-surface-variant'
                  }`}
                >
                  {cat === 'all' ? 'All Items (सभी सामान)' : cat}
                </button>
              ))}
            </div>

            {/* Catalog Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {catalogItems.map((item) => {
                const inBill = billItems.find(
                  (bi) => bi.itemId === item.id || bi.name.toLowerCase() === item.name.toLowerCase()
                );
                const inBillQty = inBill ? inBill.qty : 0;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectCatalogItem(item)}
                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer group hover:shadow-md ${
                      inBillQty > 0
                        ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-surface-container-lowest border-surface-variant hover:border-primary hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-surface-container-high text-outline uppercase tracking-wider truncate max-w-[80px]">
                          {item.category}
                        </span>
                        {inBillQty > 0 && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-600 text-white flex items-center gap-0.5 shrink-0">
                            <span className="material-symbols-outlined text-[10px]">check</span>
                            x{inBillQty}
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-xs text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                    </div>

                    <div className="pt-2.5 mt-2 border-t border-surface-variant/80 flex items-end justify-between">
                      <div>
                        <span className="text-[9px] text-outline block">Retail Rate</span>
                        <span className="text-xs font-black text-emerald-700">
                          ₹{item.sellPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-outline ml-0.5">/{item.unit}</span>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          inBillQty > 0
                            ? 'bg-emerald-600 text-white'
                            : 'bg-surface-container-high group-hover:bg-primary group-hover:text-white text-outline'
                        }`}
                        title="Add to Bill"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">
                          {inBillQty > 0 ? 'add' : 'add_shopping_cart'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {catalogItems.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-outline">
                  No products found in catalog matching "{catalogSearch}". You can also add custom items manually below!
                </div>
              )}
            </div>
          </div>

          {/* Bottom Grid: Bill Form (7 cols) + Thermal/PDF Receipt Preview (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Bill Creator & Automatic Money Calculator (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
                  <div>
                    <h2 className="font-bold text-base sm:text-lg text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
                      <span>{t.billing.title}</span>
                    </h2>
                    <p className="text-xs text-outline">{t.billing.subtitle}</p>
                  </div>
                  {billItems.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearBill}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete_sweep</span>
                      <span>Clear Bill</span>
                    </button>
                  )}
                </div>

                {/* Customer Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-on-surface">
                    {t.billing.selectCustomer}
                  </label>
                  <select
                    value={billCustomer}
                    onChange={(e) => setBillCustomer(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-surface-variant bg-surface-container-low text-xs font-medium focus:outline-hidden focus:bg-white focus:border-primary cursor-pointer"
                  >
                    <option value="walkin">{t.billing.cashCustomer}</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.village}) • Current Udhar: ₹{c.netBalance.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Items Table in Bill */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                    <span className="flex items-center gap-1.5">
                      <span>Selected Items in Bill (सामान सूची)</span>
                      <span className="px-2 py-0.2 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        {billItems.length} items ({billTotalQty} units)
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddBillItem}
                      className="text-primary hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      <span>+ Custom Item</span>
                    </button>
                  </div>

                  {billItems.length === 0 ? (
                    <div className="p-8 rounded-2xl border-2 border-dashed border-surface-variant text-center space-y-2">
                      <span className="material-symbols-outlined text-3xl text-outline block">
                        shopping_basket
                      </span>
                      <p className="text-xs text-outline font-medium">
                        No items added yet. Click on any item in the Catalog above to add it automatically!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {billItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 gap-2 p-3 rounded-2xl bg-surface-container-low border border-surface-variant items-center text-xs hover:border-primary/50 transition-colors"
                        >
                          {/* Item Name */}
                          <div className="col-span-12 sm:col-span-5">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateBillItem(idx, 'name', e.target.value)}
                              placeholder="Item description"
                              className="w-full py-1.5 px-2.5 rounded-lg border border-surface-variant bg-white text-xs font-bold text-on-surface focus:outline-hidden focus:border-primary"
                            />
                            {item.unit && (
                              <span className="text-[10px] text-outline font-mono ml-1">
                                Unit: {item.unit}
                              </span>
                            )}
                          </div>

                          {/* Quantity Selector with - and + */}
                          <div className="col-span-6 sm:col-span-3 flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleAdjustBillItemQty(idx, -1)}
                              className="w-6 h-6 rounded-md bg-white border border-surface-variant hover:bg-surface-variant flex items-center justify-center text-outline hover:text-on-surface cursor-pointer shrink-0"
                              title="Decrease Qty"
                            >
                              <span className="material-symbols-outlined text-xs">remove</span>
                            </button>
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={item.qty}
                              onChange={(e) => handleUpdateBillItem(idx, 'qty', e.target.value)}
                              placeholder="Qty"
                              className="w-14 py-1 px-1 rounded-md border border-surface-variant bg-white text-xs font-mono font-bold text-center focus:outline-hidden focus:border-primary"
                            />
                            <button
                              type="button"
                              onClick={() => handleAdjustBillItemQty(idx, 1)}
                              className="w-6 h-6 rounded-md bg-white border border-surface-variant hover:bg-surface-variant flex items-center justify-center text-outline hover:text-on-surface cursor-pointer shrink-0"
                              title="Increase Qty"
                            >
                              <span className="material-symbols-outlined text-xs">add</span>
                            </button>
                          </div>

                          {/* Rate */}
                          <div className="col-span-3 sm:col-span-2">
                            <div className="relative">
                              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] text-outline">₹</span>
                              <input
                                type="number"
                                min="0"
                                value={item.rate}
                                onChange={(e) => handleUpdateBillItem(idx, 'rate', e.target.value)}
                                placeholder="Rate"
                                className="w-full py-1 pl-4 pr-1.5 rounded-lg border border-surface-variant bg-white text-xs font-mono font-bold text-right focus:outline-hidden focus:border-primary"
                              />
                            </div>
                          </div>

                          {/* Line Total & Remove */}
                          <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-1.5">
                            <span className="font-mono font-black text-on-surface text-xs sm:text-sm text-right">
                              ₹{(item.amount || 0).toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveBillItem(idx)}
                              className="text-outline hover:text-rose-600 p-1 cursor-pointer transition-colors"
                              title="Remove item"
                            >
                              <span className="material-symbols-outlined text-base">close</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Automatic Money Breakdown & Discount */}
                <div className="p-4 rounded-2xl bg-surface-container-high border border-surface-variant space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-outline font-medium">Subtotal (सामान की कुल राशि):</span>
                    <span className="font-mono font-bold text-on-surface">
                      ₹{billSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-outline font-medium">Special Discount (छूट ₹):</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-sm">
                        Optional
                      </span>
                    </div>
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-outline">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={billDiscount}
                        onChange={(e) => setBillDiscount(e.target.value)}
                        placeholder="0"
                        className="w-full py-1 pl-5 pr-2 rounded-lg border border-surface-variant bg-white text-xs font-mono font-bold text-right focus:outline-hidden focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Grand Total Highlight Box */}
                  <div className="pt-2 border-t border-surface-variant flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline block">
                        Net Total Amount (स्वचालित कुल राशि)
                      </span>
                      <span className="text-xs text-outline">
                        {billItems.length} items • {billTotalQty} units
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono tracking-tight">
                        ₹{billTotalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selector */}
                <div className="space-y-2 pt-2 border-t border-surface-variant">
                  <label className="block text-xs font-bold text-on-surface">
                    {t.billing.paymentMode}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setBillPaymentMode('cash')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        billPaymentMode === 'cash'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                          : 'bg-white border-surface-variant text-outline hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">payments</span>
                      <span>{t.billing.cash}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBillPaymentMode('upi')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        billPaymentMode === 'upi'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                          : 'bg-white border-surface-variant text-outline hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">qr_code</span>
                      <span>{t.billing.upi}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (billCustomer === 'walkin') {
                          onShowToast('Please select a registered customer to add this to Khata', 'warning');
                          return;
                        }
                        setBillPaymentMode('khata');
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        billPaymentMode === 'khata'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs ring-2 ring-rose-500/20'
                          : 'bg-white border-surface-variant text-outline hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">book</span>
                      <span>{t.billing.creditKhata}</span>
                    </button>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-surface-variant">
                  <div className="text-xs text-outline">
                    <span>Includes live inventory auto-deduction & bahi-khata ledger sync</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleGenerateBill}
                      className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      <span>{t.billing.generateSlip}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!generatedBillReceipt) {
                          handleGenerateBill();
                        }
                        setTimeout(() => handleDownloadPdf(), 150);
                      }}
                      className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      title="Download Official PDF Receipt"
                    >
                      <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Thermal Receipt Preview & Sovereign PDF Export (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-amber-50/60 border-2 border-dashed border-amber-300 shadow-sm space-y-4 relative overflow-hidden">
                {/* Tricolor accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 flex">
                  <div className="w-1/3 bg-[#FF9933]"></div>
                  <div className="w-1/3 bg-white"></div>
                  <div className="w-1/3 bg-[#138808]"></div>
                </div>

                {/* Shop Sovereign Header */}
                <div className="text-center space-y-1 pb-3 border-b border-dashed border-amber-300 pt-1">
                  <div className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
                    {t.defaultShopName}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    {t.shopLocation}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    Proprietor: {t.defaultOwner} • Udyam: UDYAM-UP-28-0091823
                  </div>
                </div>

                {generatedBillReceipt ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono text-stone-700">
                      <span>Bill No: <strong className="text-primary">{generatedBillReceipt.billNumber}</strong></span>
                      <span>{generatedBillReceipt.billDate} {generatedBillReceipt.billTime}</span>
                    </div>

                    <div className="text-xs text-stone-800 flex justify-between">
                      <span>
                        <span className="text-stone-500">Customer:</span>{' '}
                        <strong>{generatedBillReceipt.customerName}</strong>
                      </span>
                      {generatedBillReceipt.customerVillage && (
                        <span className="text-[10px] text-stone-500">
                          {generatedBillReceipt.customerVillage}
                        </span>
                      )}
                    </div>

                    {/* Receipt Items Breakdown */}
                    <div className="border-t border-b border-dashed border-amber-300 py-2.5 space-y-1.5 text-xs">
                      <div className="flex justify-between font-mono text-[10px] text-stone-500 font-bold uppercase pb-1 border-b border-dashed border-amber-200">
                        <span>Item (Qty)</span>
                        <span>Rate × Qty = Amount</span>
                      </div>
                      {generatedBillReceipt.items.map((it: any, i: number) => (
                        <div key={i} className="flex justify-between font-mono text-xs">
                          <span className="truncate max-w-[170px] text-stone-900 font-medium">
                            {it.name} (x{it.qty} {it.unit || ''})
                          </span>
                          <span className="font-bold text-stone-900">
                            ₹{(it.amount || 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal & Discount if present */}
                    {generatedBillReceipt.discount > 0 && (
                      <div className="space-y-1 text-xs font-mono text-stone-700">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{generatedBillReceipt.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-rose-600 font-bold">
                          <span>Discount (छूट):</span>
                          <span>- ₹{generatedBillReceipt.discount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    )}

                    {/* Total Amount in bold */}
                    <div className="flex justify-between font-black text-base text-stone-950 pt-1 border-t border-stone-200">
                      <span>TOTAL NET AMOUNT:</span>
                      <span className="text-emerald-800 font-mono text-lg">
                        ₹{generatedBillReceipt.total.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Payment Mode Banner */}
                    <div
                      className={`text-[11px] font-mono font-bold uppercase text-center py-1.5 rounded-lg ${
                        generatedBillReceipt.paymentMode === 'cash'
                          ? 'bg-emerald-100 text-emerald-900'
                          : generatedBillReceipt.paymentMode === 'upi'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      Payment: {generatedBillReceipt.paymentMode === 'cash'
                        ? 'CASH (नकद भुगतान प्राप्त)'
                        : generatedBillReceipt.paymentMode === 'upi'
                        ? 'UPI QR (डिजिटल प्राप्त)'
                        : 'ADDED TO KHATA (उधार खाता)'}
                    </div>

                    {/* Khata Balance Notification */}
                    {generatedBillReceipt.paymentMode === 'khata' && generatedBillReceipt.newBalance !== undefined && (
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-900 space-y-0.5">
                        <div className="font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">book</span>
                          <span>Bahi-Khata Ledger Updated:</span>
                        </div>
                        <div>
                          New Balance to Collect: <strong>₹{generatedBillReceipt.newBalance.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>
                    )}

                    {/* UPI Scan representation */}
                    <div className="pt-1 flex items-center justify-between p-2 rounded-xl bg-white/80 border border-amber-200 text-xs text-stone-700">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">qr_code_2</span>
                        <div className="text-[10px] leading-tight">
                          <span className="font-bold block">BharatPe / BHIM UPI</span>
                          <span className="text-stone-500 font-mono">radhekirana@barodampay</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verified QR
                      </span>
                    </div>

                    {/* Action Buttons: PDF, Print, WhatsApp */}
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadPdf()}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
                      >
                        <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                        <span>{t.billing.downloadPdf || 'Download PDF Receipt (PDF रसीद)'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">print</span>
                          <span>{t.billing.printParchi}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const billMsg = `*${t.defaultShopName}*\nBill No: ${
                              generatedBillReceipt.billNumber
                            }\nDate: ${generatedBillReceipt.billDate}\nCustomer: ${
                              generatedBillReceipt.customerName
                            }\n\n*Items Purchased:*\n${generatedBillReceipt.items
                              .map(
                                (i: any, idx: number) =>
                                  `${idx + 1}. ${i.name} (x${i.qty} ${i.unit || ''}) = ₹${i.amount}`
                              )
                              .join('\n')}\n\n*TOTAL NET AMOUNT: ₹${generatedBillReceipt.total}*\nPayment Mode: ${generatedBillReceipt.paymentMode.toUpperCase()}\n\nThank you for shopping at ${t.defaultShopName}!\nProp: ${t.defaultOwner}`;
                            
                            const cleanPhone = (generatedBillReceipt.customerPhone || '').replace(/[^0-9]/g, '');
                            const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                            navigator.clipboard.writeText(billMsg);
                            onShowToast('Bill summary copied for WhatsApp dispatch!', 'success');
                            if (fullPhone) {
                              window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(billMsg)}`, '_blank');
                            } else {
                              window.open(`https://wa.me/?text=${encodeURIComponent(billMsg)}`, '_blank');
                            }
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">share</span>
                          <span>{t.billing.shareWhatsapp || 'WhatsApp Bill'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-stone-500 text-xs space-y-2">
                    <span className="material-symbols-outlined text-4xl text-amber-500 block">
                      receipt
                    </span>
                    <div className="font-bold text-stone-700">Digital Thermal Parchi Generator</div>
                    <p className="max-w-xs mx-auto text-stone-500">
                      Select items from the catalog above and click <strong>"Create & Save Parchi"</strong> or <strong>"Download PDF"</strong> to generate your official bill receipt.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 5: INVENTORY & STOCK (सामान व स्टॉक) */}
      {/* ================================================================ */}
      {activeTab === 'inventory' && (
        <div className="p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-surface-variant">
            <div>
              <h2 className="font-bold text-base sm:text-lg text-on-surface">
                {t.inventory.title}
              </h2>
              <p className="text-xs text-outline">{t.inventory.subtitle}</p>
            </div>
            <button
              onClick={() => setIsAddInventoryOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_box</span>
              <span>{t.inventory.addItem}</span>
            </button>
          </div>

          <div className="border border-surface-variant rounded-2xl overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-surface-container-high border-b border-surface-variant font-bold text-outline text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Cost Price (₹)</th>
                  <th className="py-3 px-4 text-right">Selling MRP (₹)</th>
                  <th className="py-3 px-4 text-right">Margin</th>
                  <th className="py-3 px-4 text-right">In Stock</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant">
                {inventory.map((item) => {
                  const marginAmt = item.sellPrice - item.buyPrice;
                  const marginPct = item.buyPrice > 0 ? ((marginAmt / item.buyPrice) * 100).toFixed(1) : '0';
                  const isLow = item.stock <= 10;

                  return (
                    <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3.5 px-4 font-bold text-on-surface">{item.name}</td>
                      <td className="py-3.5 px-4 text-outline">{item.category}</td>
                      <td className="py-3.5 px-4 text-right font-mono">₹{item.buyPrice}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-primary">
                        ₹{item.sellPrice}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                        +{marginPct}% (₹{marginAmt})
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-on-surface">
                        {item.stock} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isLow ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                            Low Stock! Reorder
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 6: VYAPAR REPORT & P&L (व्यापार रिपोर्ट) */}
      {/* ================================================================ */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-surface-variant shadow-sm space-y-6">
            <div>
              <h2 className="font-bold text-base sm:text-lg text-on-surface">
                {t.analytics.title}
              </h2>
              <p className="text-xs text-outline">{t.analytics.subtitle}</p>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-1">
                <span className="text-[10px] font-bold text-outline uppercase">
                  Monthly Estimated Turnover
                </span>
                <div className="text-2xl font-black text-on-surface">
                  ₹4,25,000
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  ↑ 14% growth vs previous harvest cycle
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-1">
                <span className="text-[10px] font-bold text-outline uppercase">
                  Average Gross Profit Margin
                </span>
                <div className="text-2xl font-black text-emerald-700">
                  16.8%
                </div>
                <div className="text-[11px] text-outline">
                  High margin on Vet supplements & Cattle feeds
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant space-y-1">
                <span className="text-[10px] font-bold text-outline uppercase">
                  Working Capital Health
                </span>
                <div className="text-2xl font-black text-primary">
                  1.84 DSCR
                </div>
                <div className="text-[11px] text-outline">
                  Bankable Sovereign Profile (Eligible for NBCFDC 5% Loan)
                </div>
              </div>
            </div>

            {/* Top 5 Debtor Accounts (Udhar Analysis) */}
            <div className="space-y-3">
              <div className="font-bold text-xs text-on-surface">
                {t.analytics.topDebtors} (Accounts with highest credit balance)
              </div>
              <div className="border border-surface-variant rounded-2xl overflow-hidden divide-y divide-surface-variant">
                {customers
                  .filter((c) => c.netBalance > 0)
                  .sort((a, b) => b.netBalance - a.netBalance)
                  .slice(0, 5)
                  .map((cust, i) => (
                    <div
                      key={cust.id}
                      className="p-3.5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-surface-container-high text-outline flex items-center justify-center font-bold text-[11px]">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-bold text-on-surface">{cust.name}</div>
                          <div className="text-[11px] text-outline">{cust.village}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-black text-rose-600">
                            ₹{cust.netBalance.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-outline">
                            Limit: ₹{cust.creditLimit.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <button
                          onClick={() => handleSendReminder(cust)}
                          className="py-1 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] cursor-pointer"
                        >
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: ADD CUSTOMER */}
      {/* ================================================================ */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-surface-variant">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <h3 className="font-bold text-base text-on-surface">
                {t.customers.addNewCustomer}
              </h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface">Customer Name (ग्राहक का नाम) *</label>
                <input
                  type="text"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Ramkishan Yadav"
                  required
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Mobile Number (मोबाइल नंबर)</label>
                <input
                  type="tel"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Village / Tola (गांव / मोहल्ला)</label>
                <input
                  type="text"
                  value={newCustVillage}
                  onChange={(e) => setNewCustVillage(e.target.value)}
                  placeholder="e.g. Rampur Kalan"
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface">Initial Balance (पुरानी बाकी ₹)</label>
                  <input
                    type="number"
                    value={newCustInitialBalance || ''}
                    onChange={(e) => setNewCustInitialBalance(Number(e.target.value))}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono font-bold focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface">Credit Limit (उधार सीमा ₹)</label>
                  <input
                    type="number"
                    value={newCustLimit || ''}
                    onChange={(e) => setNewCustLimit(Number(e.target.value))}
                    placeholder="15000"
                    className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono font-bold focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-surface-variant text-outline hover:bg-surface-container font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold cursor-pointer shadow-md"
                >
                  Save Customer Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: CUSTOMER TRANSACTION (मैंने दिया / मुझे मिला) */}
      {/* ================================================================ */}
      {isAddTxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-surface-variant">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <div>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    txType === 'give' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {txType === 'give' ? 'Maine Diya (उधार दिया)' : 'Mujhe Mila (रुपये मिले)'}
                </span>
                <h3 className="font-bold text-base text-on-surface mt-1">
                  {selectedCustomer?.name}
                </h3>
              </div>
              <button
                onClick={() => setIsAddTxOpen(false)}
                className="text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomerTx} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface">{t.customers.amountLabel} *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-base text-outline">₹</span>
                  <input
                    type="number"
                    step="any"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                    required
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono text-lg font-black focus:outline-hidden focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">{t.customers.billNoOrNote}</label>
                <input
                  type="text"
                  value={txNote}
                  onChange={(e) => setTxNote(e.target.value)}
                  placeholder="e.g. 2 Bags Cattle Feed, Mustard Oil 2L"
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Bill / Parchi Reference No. (Optional)</label>
                <input
                  type="text"
                  value={txBillNo}
                  onChange={(e) => setTxBillNo(e.target.value)}
                  placeholder="e.g. P-920"
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTxOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-surface-variant text-outline hover:bg-surface-container font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`py-2.5 px-5 rounded-xl text-white font-bold cursor-pointer shadow-md ${
                    txType === 'give' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  Confirm & Save in Khata
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: SUPPLIER TRANSACTION (माल आया / भुगतान किया) */}
      {/* ================================================================ */}
      {isSupplierTxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-surface-variant">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {supTxType === 'purchase' ? 'Stock Purchase (उधार माल आया)' : 'Supplier Payment (भुगतान किया)'}
                </span>
                <h3 className="font-bold text-base text-on-surface mt-1">
                  {selectedSupplier?.name}
                </h3>
              </div>
              <button
                onClick={() => setIsSupplierTxOpen(false)}
                className="text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSupplierTx} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface">Amount (राशि ₹) *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 font-bold text-base text-outline">₹</span>
                  <input
                    type="number"
                    step="any"
                    value={supTxAmount}
                    onChange={(e) => setSupTxAmount(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                    required
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono text-lg font-black focus:outline-hidden focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Wholesaler Invoice / Challan No.</label>
                <input
                  type="text"
                  value={supTxInvoice}
                  onChange={(e) => setSupTxInvoice(e.target.value)}
                  placeholder="e.g. INV-AM-891"
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Item Goods Description / Remarks</label>
                <input
                  type="text"
                  value={supTxNote}
                  onChange={(e) => setSupTxNote(e.target.value)}
                  placeholder="e.g. 50 Bags Cattle feed received via truck"
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSupplierTxOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-surface-variant text-outline hover:bg-surface-container font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-md"
                >
                  Save Supplier Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: ADD EXPENSE (दुकान का खर्चा) */}
      {/* ================================================================ */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-surface-variant">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <h3 className="font-bold text-base text-on-surface">
                {t.galla.recordExpense}
              </h3>
              <button
                onClick={() => setIsAddExpenseOpen(false)}
                className="text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface">Expense Description *</label>
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="e.g. Milk Chilling Generator Diesel / Tempo Fare"
                  required
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Category</label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary cursor-pointer"
                >
                  <option value="Logistics">Logistics / Transportation</option>
                  <option value="Electricity">Electricity & Fuel</option>
                  <option value="Maintenance">Maintenance & Repairs</option>
                  <option value="Refreshment">Refreshment / Tea / Office</option>
                  <option value="Labor">Helper / Labor Wages</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface">Amount (रुपये ₹) *</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low font-mono text-base font-bold focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-surface-variant text-outline hover:bg-surface-container font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer shadow-md"
                >
                  Deduct from Galla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: ADD INVENTORY ITEM */}
      {/* ================================================================ */}
      {isAddInventoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-surface-variant">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <h3 className="font-bold text-base text-on-surface">
                {t.inventory.addItem}
              </h3>
              <button
                onClick={() => setIsAddInventoryOpen(false)}
                className="text-outline hover:text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddInventory} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface">{t.inventory.itemName} *</label>
                <input
                  type="text"
                  value={invName}
                  onChange={(e) => setInvName(e.target.value)}
                  placeholder="e.g. Sona Masoori Rice (25kg)"
                  required
                  className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface">Category</label>
                  <select
                    value={invCategory}
                    onChange={(e) => setInvCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low cursor-pointer"
                  >
                    <option value="Kirana">Kirana / Grocery</option>
                    <option value="Dairy Feed">Dairy Cattle Feed</option>
                    <option value="Vet Medicine">Vet / Animal Health</option>
                    <option value="Hardware">Dairy Hardware</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface">Unit of Measure</label>
                  <select
                    value={invUnit}
                    onChange={(e) => setInvUnit(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-surface-variant bg-surface-container-low cursor-pointer"
                  >
                    <option value="Bags">Bags / बोरी</option>
                    <option value="kg">kg / किलोग्राम</option>
                    <option value="Litres">Litres / लीटर</option>
                    <option value="Pouches">Pouches / पैकेट</option>
                    <option value="Pcs">Pcs / नग</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface">Cost Rate ₹</label>
                  <input
                    type="number"
                    value={invBuyPrice}
                    onChange={(e) => setInvBuyPrice(e.target.value)}
                    placeholder="0"
                    required
                    className="w-full p-2 rounded-xl border border-surface-variant bg-surface-container-low font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface">MRP Rate ₹</label>
                  <input
                    type="number"
                    value={invSellPrice}
                    onChange={(e) => setInvSellPrice(e.target.value)}
                    placeholder="0"
                    required
                    className="w-full p-2 rounded-xl border border-surface-variant bg-surface-container-low font-mono font-bold text-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface">Initial Stock</label>
                  <input
                    type="number"
                    value={invStock}
                    onChange={(e) => setInvStock(e.target.value)}
                    placeholder="0"
                    required
                    className="w-full p-2 rounded-xl border border-surface-variant bg-surface-container-low font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddInventoryOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-surface-variant text-outline hover:bg-surface-container font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold cursor-pointer shadow-md"
                >
                  Add to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Business Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-surface-variant max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-variant">
              <div>
                <h3 className="font-extrabold text-lg text-stone-900">
                  {currentLanguage === 'hi' ? 'व्यवसाय प्रोफ़ाइल संपादित करें' : 'Edit Business Profile'}
                </h3>
                <p className="text-xs text-stone-500">
                  {currentLanguage === 'hi' ? 'दुकान का नाम, पता, फोन व यूपीआई विवरण बदलें' : 'Update store identity, proprietor, location, and billing settings'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'दुकान / व्यवसाय का नाम' : 'Business / Store Name'} *</label>
                  <input
                    type="text"
                    required
                    value={regBusinessName}
                    onChange={(e) => setRegBusinessName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'मालिक / प्रोप्राइटर का नाम' : 'Proprietor / Owner Name'} *</label>
                  <input
                    type="text"
                    required
                    value={regOwnerName}
                    onChange={(e) => setRegOwnerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'व्यवसाय का प्रकार' : 'Business Category'}</label>
                  <select
                    value={regBusinessType}
                    onChange={(e) => setRegBusinessType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm bg-white"
                  >
                    <option value="Grocery & Kirana Store">Grocery & Kirana Store</option>
                    <option value="Dairy & Milk Center">Dairy & Milk Center</option>
                    <option value="Agri Inputs & Fertilizers">Agri Inputs & Fertilizers</option>
                    <option value="Cattle Feed & Animal Nutrition">Cattle Feed & Animal Nutrition</option>
                    <option value="Hardware & Tools">Hardware & Tools</option>
                    <option value="Veterinary & Pharmacy">Veterinary & Pharmacy</option>
                    <option value="General Retail Store">General Retail Store</option>
                    <option value="Other Commercial Enterprise">Other Enterprise</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'मोबाइल नंबर (WhatsApp)' : 'Mobile Phone'} *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'दुकान का पता' : 'Street / Market Address'}</label>
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'गांव / शहर' : 'Village / Town'} *</label>
                  <input
                    type="text"
                    required
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'जिला' : 'District'} *</label>
                  <input
                    type="text"
                    required
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'राज्य' : 'State'} *</label>
                  <input
                    type="text"
                    required
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">{currentLanguage === 'hi' ? 'UPI ID (QR रसीद)' : 'Shop UPI ID'}</label>
                  <input
                    type="text"
                    value={regUpiId}
                    onChange={(e) => setRegUpiId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span>
                  <span>{currentLanguage === 'hi' ? 'पंजीकरण रीसेट करें' : 'Reset Registration'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-white font-bold cursor-pointer shadow-md"
                  >
                    {currentLanguage === 'hi' ? 'सहेजें' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Registration Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h3 className="font-extrabold text-lg text-stone-900">
                {currentLanguage === 'hi' ? 'पंजीकरण रीसेट करें?' : 'Reset Business Profile?'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentLanguage === 'hi'
                ? 'क्या आप सुनिश्चित हैं? इससे आपकी वर्तमान पंजीकृत दुकान की जानकारी हट जाएगी और आप दोबारा नई दुकान पंजीकृत कर सकेंगे।'
                : 'Are you sure you want to reset your business registration? This will clear the registered shop profile and return you to the initial registration screen.'}
            </p>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="py-2 px-4 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs cursor-pointer hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetRegistration}
                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                {currentLanguage === 'hi' ? 'हाँ, रीसेट करें' : 'Yes, Reset Registration'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Supplier / Wholesaler */}
      {isAddSupplierOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-surface-variant space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
              <div className="flex items-center gap-2 text-amber-700">
                <span className="material-symbols-outlined text-2xl">add_business</span>
                <h3 className="font-extrabold text-base text-stone-900">
                  {currentLanguage === 'hi' ? 'नया सप्लायर / थोक व्यापारी जोड़ें' : 'Add New Supplier / Wholesaler'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddSupplierOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700">
                  {currentLanguage === 'hi' ? 'सप्लायर / फर्म का नाम *' : 'Wholesaler / Supplier Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newSupName}
                  onChange={(e) => setNewSupName(e.target.value)}
                  placeholder="e.g. Shree Balaji Mandi Wholesalers"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-600 font-semibold"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">
                  {currentLanguage === 'hi' ? 'मोबाइल नंबर' : 'Phone / Contact Number'}
                </label>
                <input
                  type="tel"
                  value={newSupPhone}
                  onChange={(e) => setNewSupPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-600 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">
                  {currentLanguage === 'hi' ? 'सप्लाई श्रेणी' : 'Supply Category'}
                </label>
                <select
                  value={newSupCategory}
                  onChange={(e) => setNewSupCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:border-amber-600"
                >
                  <option value="Wholesale Mandi">Wholesale Mandi (थोक मंडी)</option>
                  <option value="Kirana FMCG & Spices">Kirana FMCG & Spices</option>
                  <option value="Dairy Feed / Cattle Nutrition">Dairy Feed & Cattle Nutrition</option>
                  <option value="Agri Inputs / Fertilizers">Agri Inputs & Fertilizers</option>
                  <option value="Packaging & Transport">Packaging & Transport</option>
                  <option value="General Distributor">General Distributor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700">
                  {currentLanguage === 'hi' ? 'पुराना बकाया (यदि कोई हो ₹)' : 'Opening Due Balance (if any ₹)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-stone-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    value={newSupInitialDue}
                    onChange={(e) => setNewSupInitialDue(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-300 font-mono font-bold"
                  />
                </div>
                <p className="text-[10px] text-stone-500">
                  {currentLanguage === 'hi'
                    ? 'यदि कोई पिछला बकाया नहीं है तो इसे 0 रखें।'
                    : 'Leave 0 if starting fresh with no outstanding debt.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSupplierOpen(false)}
                  className="py-2 px-4 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-md"
                >
                  {currentLanguage === 'hi' ? 'सप्लायर खाता जोड़ें' : 'Add Supplier Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Clear Ledger to ₹0 Confirmation Dialog */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <span className="material-symbols-outlined text-3xl">cleaning_services</span>
              <h3 className="font-extrabold text-lg text-stone-900">
                {currentLanguage === 'hi' ? 'बही-खाता ₹0 पर रीसेट करें?' : 'Clear Ledger to ₹0?'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentLanguage === 'hi'
                ? 'क्या आप सभी ग्राहक खाते, सप्लायर खाते, आज की बिक्री और उधारी को हटाकर एकदम स्वच्छ ₹0 से शुरू करना चाहते हैं? आपकी दुकान का पंजीकरण सुरक्षित रहेगा।'
                : 'Are you sure you want to clear all customer balances, supplier dues, and sales records? Everything will start at clean ₹0. Your registered business profile remains intact.'}
            </p>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsClearConfirmOpen(false)}
                className="py-2 px-4 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs cursor-pointer hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearLedger}
                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                {currentLanguage === 'hi' ? 'हाँ, ₹0 पर साफ़ करें' : 'Yes, Clear to ₹0'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Load Practice Demo Data Dialog */}
      {isLoadDemoOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-200 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <span className="material-symbols-outlined text-3xl">science</span>
              <h3 className="font-extrabold text-lg text-stone-900">
                {currentLanguage === 'hi' ? 'डेमो अभ्यास डेटा लोड करें?' : 'Load Demo Practice Data?'}
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentLanguage === 'hi'
                ? 'यह परीक्षण के लिए कुछ नमूना ग्राहक, सप्लायर और स्टॉक जोड़ देगा। आप बाद में "खाता ₹0 करें" दबाकर कभी भी सब कुछ साफ़ कर सकते हैं।'
                : 'This will load sample demo customers, suppliers, and inventory for practice. You can clear back to ₹0 at any time.'}
            </p>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsLoadDemoOpen(false)}
                className="py-2 px-4 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs cursor-pointer hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLoadSampleData}
                className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                {currentLanguage === 'hi' ? 'हाँ, डेमो लोड करें' : 'Load Demo Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
