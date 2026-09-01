import { Course } from '../types';

export const ORG_DETAILS = {
  // Main Franchise / Partner Salon (User's Salon - Top Focus)
  parlourName: 'प्रिंसेस ब्युटी पार्लर व अकॅडमी, अकोट',
  parlourNameEn: 'Princess Beauty Parlour & Academy, Akot',
  parlourShortName: 'प्रिंसेस ब्युटी पार्लर (अकोट)',
  parlourShortNameEn: 'Princess Beauty Parlour (Akot)',
  parlourAddress: 'संभाजी नगर, अकोट, जि. अकोला (महाराष्ट्र)',
  parlourAddressEn: 'Sambhaji Nagar, Akot, Dist. Akola (Maharashtra)',
  parlourLocationTag: 'अकोट (संभाजी नगर)',
  
  // Government Registered Affiliated NGO / Board
  regdOrgName: 'मुक्ता शिक्षण प्रसारक मंडळ अकोला',
  regdOrgNameEn: 'Mukta Shikshan Prasarak Mandal Akola',
  regdCenterName: 'मुक्ता ब्युटी पार्लर व प्रशिक्षण केंद्र',
  regdCenterNameEn: 'Mukta Beauty Parlour & Training Center',
  govtRegNumber: 'महाराष्ट्र गव्हें र.नं. ४४२५/१५, अकोला मुंबई एफ/नं. ३६१५/१५',
  govtRegNumberEn: 'Maha Govt Reg. No. 4425/15, Akola Mumbai F/No. 3615/15',
  headOffice: 'विभागीय कार्यालय, विठ्ठल नगर, मोठी उमरी, अकोला',
  headOfficeEn: 'Divisional Office, Vitthal Nagar, Mothi Umri, Akola',
  
  // Contract & Slogan details
  partnershipNote: 'प्रिंसेस ब्युटी पार्लर, अकोट यांच्या अधिकृत सहकार्याने व कराराने आयोजित',
  partnershipNoteEn: 'Conducted under official partnership & contract at Princess Beauty Parlour, Akot',
  slogan: 'सुशिक्षित बेरोजगार, गरजू महिलांसाठी सुवर्ण संधी...!',
  sloganEn: 'Golden Opportunity for Educated Unemployed & Needy Women...!',
  schemeNotice: 'सदरहू कोर्सनुसार प्रशिक्षित उमेदवाराला शासकीय विविध योजनांचा लाभ मिळू शकेल व स्वयं रोजगार सुरु करता येईल. त्याकरिता संस्था आपणास मार्गदर्शन करेल.',
  schemeNoticeEn: 'Trained candidates can avail benefits of various Government schemes and start self-employment. The organization will provide full guidance and assistance.',
  fixedFee: 2000
};

export const SYLLABUS_MODULES = [
  { id: 'threading', nameHi: 'थ्रेडिंग', nameEn: 'Threading', category: 'Basic Grooming' },
  { id: 'waxing', nameHi: 'वॅक्सिंग', nameEn: 'Waxing', category: 'Skin & Grooming' },
  { id: 'facial', nameHi: 'फेशिअल', nameEn: 'Facial', category: 'Skin Care' },
  { id: 'bleach', nameHi: 'ब्लीच', nameEn: 'Bleach', category: 'Skin Care' },
  { id: 'hair_cut', nameHi: 'हेअर कट', nameEn: 'Hair Cut', category: 'Hair Styling' },
  { id: 'chemical_dye', nameHi: 'केमिकल डाय', nameEn: 'Chemical Dye', category: 'Hair Chemistry' },
  { id: 'pedicure_manicure', nameHi: 'पेडीक्युर व मॅनीक्युर', nameEn: 'Pedicure & Manicure', category: 'Hand & Foot Care' },
  { id: 'straightening', nameHi: 'स्ट्रेटनिंग', nameEn: 'Straightening', category: 'Hair Treatment' },
  { id: 'hair_style', nameHi: 'हेअर स्टाईल', nameEn: 'Hair Style', category: 'Hair Artistry' },
  { id: 'mehndi_dye', nameHi: 'मेहंदी डाय', nameEn: 'Mehndi Dye', category: 'Hair & Henna Care' },
  { id: 'makeup', nameHi: 'मेकअप', nameEn: 'Makeup', category: 'Makeup Artistry' },
  { id: 'draping', nameHi: 'ड्रेपिंग (साडी व दुपट्टा)', nameEn: 'Draping', category: 'Styling & Draping' },
  { id: 'hair_setting', nameHi: 'हेअर सेटिंग', nameEn: 'Hair Setting', category: 'Hair Styling' }
];

export const COURSES: Course[] = [
  {
    id: 'saundarya-shastra-certificate',
    name: 'Soundarya Shastra Certificate Course (All Practical Modules at Princess Parlour, Akot)',
    nameHi: 'सौंदर्य शास्त्र प्रमाणपत्र कोर्स (प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट)',
    badge: 'प्रिंसेस ब्युटी पार्लर अकोट • शासकीय प्रमाणपत्र • फी ₹२०००',
    badgeHi: 'प्रिंसेस ब्युटी पार्लर अकोट • शासकीय प्रमाणपत्र • फी ₹२०००',
    duration: 'Practical Training at Princess Beauty Parlour, Sambhaji Nagar, Akot',
    durationHi: 'प्रॅक्टिकल प्रशिक्षण: प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट',
    originalFee: 12000,
    subsidizedFee: 2000,
    discountPercentage: 83,
    level: 'Complete Practical Certification Course',
    levelHi: 'थ्रेडिंग, वॅक्सिंग, फेशिअल, हेअर कट, मेकअप संपूर्ण प्रॅक्टिकल कोर्स (अकोट केंद्र)',
    topics: [
      'Threading & Waxing (थ्रेडिंग व वॅक्सिंग)',
      'Facial & Bleach (फेशिअल व ब्लीच)',
      'Hair Cut & Hair Styling (हेअर कट व हेअर स्टाईल)',
      'Chemical Dye & Mehndi Dye (केमिकल डाय व मेहंदी डाय)',
      'Pedicure & Manicure (पेडीक्युर व मॅनीक्युर)',
      'Hair Straightening & Hair Setting (स्ट्रेटनिंग व हेअर सेटिंग)',
      'Makeup & Saree Draping (मेकअप व ड्रेपिंग)',
      'Govt Scheme Benefits & Self-Employment Setup'
    ],
    topicsHi: [
      'थ्रेडिंग (Threading) व वॅक्सिंग (Waxing)',
      'फेशिअल (Facial) व ब्लीच (Bleach)',
      'हेअर कट (Hair Cut) व हेअर स्टाईल (Hair Style)',
      'केमिकल डाय (Chemical Dye) व मेहंदी डाय (Mehndi Dye)',
      'पेडीक्युर व मॅनीक्युर (Pedicure & Manicure)',
      'स्ट्रेटनिंग (Straightening) व हेअर सेटिंग (Hair Setting)',
      'मेकअप (Makeup) व साडी ड्रेपिंग (Draping)',
      'शासकीय विविध योजनांचा लाभ व स्वयंरोजगार मार्गदर्शन'
    ],
    certificationType: 'Govt. Registered Certificate issued via Mukta Shikshan Prasarak Mandal Akola (Reg. No. 4425/15)',
    certificationTypeHi: 'मुक्ता शिक्षण प्रसारक मंडळ अकोला (महाराष्ट्र गव्हें र.नं. ४४२५/१५) अधिकृत शासकीय प्रमाणपत्र',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'bridal-and-hair-special',
    name: 'Special Advance Makeup, Hair Cut & Hair Style (Princess Parlour, Akot)',
    nameHi: 'विशेष मेकअप, हेअर कट व हेअर स्टाईल (प्रिंसेस पार्लर, अकोट)',
    badge: 'अकोट केंद्र • फी ₹२०००',
    badgeHi: 'अकोट केंद्र • फी ₹२०००',
    duration: 'Hands-on Practical at Sambhaji Nagar, Akot',
    durationHi: 'थेट प्रॅक्टिकल: संभाजी नगर, अकोट केंद्र',
    originalFee: 10000,
    subsidizedFee: 2000,
    discountPercentage: 80,
    level: 'Makeup & Hair Specialist',
    levelHi: 'मेकअप, हेअर कट व स्टाईलिंग स्पेशालिस्ट',
    topics: [
      'Makeup Techniques (HD & Party Makeup)',
      'Designer Haircuts & Hair Styles',
      'Hair Straightening & Hair Setting',
      'Saree & Dupatta Draping Methods',
      'Threading, Bleach & Facial Glow'
    ],
    topicsHi: [
      'मेकअप (Makeup) व आय-मेकअप क्रिएशन',
      'लेटेस्ट हेअर कट (Hair Cut) व हेअर स्टाईल (Hair Style)',
      'स्ट्रेटनिंग (Straightening) व हेअर सेटिंग (Hair Setting)',
      'साडी व दुपट्टा ड्रेपिंग (Draping) तंत्रज्ञान',
      'थ्रेडिंग, ब्लीच व फेशिअल'
    ],
    certificationType: 'Mukta Shikshan Prasarak Mandal Govt Reg Certificate',
    certificationTypeHi: 'मुक्ता शिक्षण प्रसारक मंडळ अकोला अधिकृत प्रमाणपत्र',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'skin-clinic-aesthetic-herbal',
    name: 'Skin Care, Facial, Waxing & Threading (Princess Parlour, Akot)',
    nameHi: 'फेशिअल, ब्लीच, वॅक्सिंग व पेडीक्युर मॅनीक्युर (प्रिंसेस पार्लर, अकोट)',
    badge: 'अकोट केंद्र • फी ₹२०००',
    badgeHi: 'अकोट केंद्र • फी ₹२०००',
    duration: 'Practical at Princess Parlour, Akot',
    durationHi: 'प्रॅक्टिकल बॅच: प्रिंसेस पार्लर, संभाजी नगर, अकोट',
    originalFee: 9000,
    subsidizedFee: 2000,
    discountPercentage: 78,
    level: 'Skin Care & Grooming Expert',
    levelHi: 'स्किन केअर व ग्रूमिंग तज्ज्ञ',
    topics: [
      'Facial & Bleach Complete Glow Care',
      'Threading & Waxing Techniques',
      'Pedicure & Manicure Foot & Hand Care',
      'Chemical Dye & Mehndi Dye Application',
      'Client Consultation & Skin Diagnosis'
    ],
    topicsHi: [
      'फेशिअल (Facial) व ब्लीच (Bleach) संपूर्ण केअर',
      'थ्रेडिंग (Threading) व वॅक्सिंग (Waxing) प्रॅक्टिकल',
      'पेडीक्युर व मॅनीक्युर (Pedicure & Manicure)',
      'केमिकल डाय (Chemical Dye) व मेहंदी डाय (Mehndi Dye)',
      'क्लाइंट कन्सल्टेशन व स्किन केअर'
    ],
    certificationType: 'Mukta Shikshan Prasarak Mandal Govt Reg Certificate',
    certificationTypeHi: 'मुक्ता शिक्षण प्रसारक मंडळ अकोला अधिकृत प्रमाणपत्र',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    popular: false
  }
];

export const OCCUPATIONS = [
  { id: 'housewife', label: 'Housewife / गृहिणी', icon: 'Home' },
  { id: 'student', label: 'Student / विद्यार्थिनी (School/College)', icon: 'GraduationCap' },
  { id: 'unemployed_woman', label: 'Educated Unemployed / सुशिक्षित बेरोजगार महिला', icon: 'Sparkles' },
  { id: 'parlour_helper', label: 'Working in Beauty Parlour / पार्लर सहाय्यक / हेल्पर', icon: 'Scissors' },
  { id: 'job', label: 'Working / खाजगी अथवा शासकीय नोकरी', icon: 'Briefcase' },
  { id: 'self_employed', label: 'Self Employed / छोटा-मोठा व्यवसाय / टेलरिंग', icon: 'UserCheck' },
  { id: 'other', label: 'Other / इतर' }
];

export const REASONS_FOR_JOINING = [
  {
    id: 'own_salon',
    title: 'Apna khud ka Beauty Parlour kholna hai (स्वयंरोजगार)',
    titleHi: 'स्वतःचे ब्युटी पार्लर सुरू करून स्वयंरोजगार करायचा आहे',
    desc: 'Government certificate se shasakiya yojana & bank loan ka labh lena',
    descHi: 'शासकीय नोंदणीकृत प्रमाणपत्राद्वारे सरकारी योजना व मुद्रा लोनचा लाभ घेणे',
    icon: 'Store'
  },
  {
    id: 'bridal_pro',
    title: 'Professional Makeup Artist banna hai (मेकअप आर्टिस्ट)',
    titleHi: 'प्रोफेशनल मेकअप व हेअर स्टाईलिस्ट बनून कमाई करायची आहे',
    desc: 'Shaadi & events me makeup orders lekar achhi kamai karna',
    descHi: 'लग्नाचे मेकअप ऑर्डर्स घेऊन आर्थिक स्वावलंबन मिळवणे',
    icon: 'Crown'
  },
  {
    id: 'extra_income',
    title: 'Ghar baithe Extra Income kamana hai (घरगुती व्यवसाय)',
    titleHi: 'घरबसल्या पार्ट-टाइम ब्युटीशियन काम करून कुटुंबाला हातभार लावायचा आहे',
    desc: 'Family ko financially support karna aur aatmanirbhar banna',
    descHi: 'कुटुंबाला आर्थिक पाठबळ देणे आणि स्वतःच्या पायावर उभे राहणे',
    icon: 'Banknote'
  },
  {
    id: 'job_career',
    title: 'Branded Beauty Parlour me achhi Job chahiye (नोकरी)',
    titleHi: 'मोठ्या ब्युटी पार्लरमध्ये सन्मानाची नोकरी मिळवायची आहे',
    desc: 'Government certificate ke sath certified beautician ban kar job karna',
    descHi: 'शासकीय प्रमाणपत्रासह खात्रीशीर नोकरीच्या संधी मिळवणे',
    icon: 'Award'
  },
  {
    id: 'self_grooming',
    title: 'Personal Grooming & Makeup sikhna hai (व्यक्तिमत्त्व विकास)',
    titleHi: 'स्वतःसाठी व कुटुंबासाठी संपूर्ण ब्युटी व हेअर केअर शिकायचे आहे',
    desc: 'Bahar parlour ka kharcha bachana aur perfect look banana',
    descHi: 'बाहेरचा खर्च वाचवून स्वतः सुंदर व आत्मविश्वासू बनणे',
    icon: 'Smile'
  },
  {
    id: 'custom_reason',
    title: 'Koi aur khaas wajah (इतर कारण - स्वतः लिहा)',
    titleHi: 'अन्य कोणतेही कारण (खाली नमूद करा)',
    desc: 'Aap apna reason likh sakte hain',
    descHi: 'आपले स्वतःचे उद्दिष्ट येथे लिहू शकता',
    icon: 'Edit3'
  }
];

export const BATCH_TIMINGS = [
  { id: 'morning_1', label: 'Morning Batch (08:00 AM - 10:00 AM)', labelHi: 'सकाळची बॅच (०८:०० AM - १०:०० AM)' },
  { id: 'morning_2', label: 'Late Morning (10:30 AM - 12:30 PM)', labelHi: 'दुपारपूर्व बॅच (१०:३० AM - १२:३० PM)' },
  { id: 'afternoon', label: 'Afternoon Batch (01:30 PM - 03:30 PM)', labelHi: 'दुपारची बॅच (०१:३० PM - ०३:३० PM)' },
  { id: 'evening', label: 'Evening Batch (04:00 PM - 06:00 PM)', labelHi: 'संध्याकाळची बॅच (०४:०० PM - ०६:०० PM)' },
  { id: 'weekend', label: 'Weekend Batch (Saturday - Sunday)', labelHi: 'वीकेंड बॅच (शनिवार - रविवार विशेष)' }
];

export const QUALIFICATIONS = [
  { id: 'below_10th', label: 'Below 10th / ८वी-९वी पास' },
  { id: '10th', label: '10th Pass / १०वी (मॅट्रिक)' },
  { id: '12th', label: '12th Pass / १२वी (HSC)' },
  { id: 'graduate', label: 'Graduate / पदवीधर (BA/BCom/BSc/इतर)' },
  { id: 'post_graduate', label: 'Post Graduate / पदव्युत्तर' },
  { id: 'other', label: 'Other / इतर' }
];
