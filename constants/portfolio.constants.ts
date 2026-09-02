import {
  BriefcaseBusiness,
  Code2,
  Database,
  FileText,
  Headphones,
  Info,
  ShieldCheck,
  Target,
  TestTube2,
  Wrench,
} from "lucide-react";
import type {
  AboutEntry,
  Certificate,
  Experience,
  ExperienceProofItem,
  ExperienceSpreadsheetPreview,
  FlowchartPreview,
  NavigationItem,
  Profile,
  Project,
  ProjectPreviewCategory,
  ProjectPreviewImage,
  ServiceOffering,
  SkillGroup,
} from "@/types/portfolio.types";

const smartPosFlowchartPreviews: FlowchartPreview[] = [
  {
    id: "options",
    label: "Options",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-Options Module.drawio.svg",
    alt: "Smart POS system flowchart preview for options module",
  },
  {
    id: "kiosk",
    label: "Kiosk",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-KIOSK Module.drawio.svg",
    alt: "Smart POS system flowchart preview for kiosk module",
  },
  {
    id: "pos",
    label: "POS",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-POS Module .drawio.svg",
    alt: "Smart POS system flowchart preview for POS module",
  },
  {
    id: "bvs",
    label: "BVS",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-BVS Module.drawio.svg",
    alt: "Smart POS system flowchart preview for BVS module",
  },
  {
    id: "managers",
    label: "Managers",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-Manager's Module.drawio.svg",
    alt: "Smart POS system flowchart preview for managers module",
  },
  {
    id: "cvs",
    label: "CVS",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-CVS Module.drawio.svg",
    alt: "Smart POS system flowchart preview for CVS module",
  },
  {
    id: "crm",
    label: "CRM",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-CRM Module.drawio.svg",
    alt: "Smart POS system flowchart preview for CRM module",
  },
  {
    id: "db",
    label: "DB",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-Smart POS DB.drawio.svg",
    alt: "Smart POS system flowchart preview for database module",
  },
];

const createProjectPreviewImages = (
  title: string,
  folder: string,
  category: string,
  fileNames: string[],
): ProjectPreviewImage[] =>
  fileNames.map((fileName) => {
    const label = fileName.slice(0, fileName.lastIndexOf("."));

    return {
      alt: `${title} preview: ${label}`,
      category,
      label,
      src: `/project%20preview/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`,
    };
  });

const smartPosPreviewCategories: ProjectPreviewCategory[] = [
  { id: "modules", label: "Modules" },
  { id: "kiosk", label: "Kiosk" },
  { id: "pos", label: "POS" },
  { id: "bvs", label: "BVS" },
  { id: "cvs", label: "CVS" },
  { id: "rating", label: "Rating" },
];

const smartPosPreviewImages = createProjectPreviewImages(
  "Smart POS System",
  "SMART POS MODULES",
  "modules",
  [
    "M 1.1 Overview.png",
    "M 1.2 Reg staff.png",
    "M 1.3 Modify Position.png",
    "M 1.4 Modiy Staff Position.png",
    "M 1.5 Staff log hist.png",
    "M 1.6 Add Product.png",
    "M 1.7 Adjust Product Price.png",
    "M 1.8 Sold Prod Analytics.png",
    "M 1.9 Sales Report.png",
    "M 1.10 Refund.png",
    "M 1.11 Waste.png",
    "M 1.12 Stock Reports.png",
    "M 1.13 Stock Control.png",
    "M 1.14 Stock Alerts.png",
    "M 1.15 Stock logs Hist.png",
    "M 1.16.png",
    "M 1.17.png",
    "M 1.18.png",
  ],
).concat(
  createProjectPreviewImages("Smart POS System", "SMART POS MODULES", "kiosk", [
    "KIOSK 1.1.png",
    "KIOSK 1.2.png",
    "KIOKS 1.3.png",
    "KIOSK 1.4.png",
  ]),
  createProjectPreviewImages("Smart POS System", "SMART POS MODULES", "pos", [
    "POS 1.1.png",
    "POS 1.2.png",
    "POS 1.3.png",
    "POS 1.4.png",
    "POS 1.5.png",
    "POS 1.6.png",
    "POS 1.7.png",
    "POS 1.8.png",
    "pos 1.9.png",
    "pos 1.10.png",
  ]),
  createProjectPreviewImages("Smart POS System", "SMART POS MODULES", "bvs", [
    "BVS 1.1.png",
    "BVS 1.2.png",
  ]),
  createProjectPreviewImages("Smart POS System", "SMART POS MODULES", "cvs", [
    "CVS CUST. VIEW.png",
    "CVS STAFF VIEW.png",
  ]),
  createProjectPreviewImages(
    "Smart POS System",
    "SMART POS MODULES",
    "rating",
    ["CUST RATING.png"],
  ),
);

const carRentalPreviewCategories: ProjectPreviewCategory[] = [
  { id: "customer", label: "Customer" },
  { id: "admin", label: "Admin" },
  { id: "rental-agent", label: "Rental Agent" },
];

const carRentalPreviewImages = createProjectPreviewImages(
  "Car Rental Management System",
  "CAR RENTAL MODULES",
  "customer",
  [
    "CR LANDING PAGE.png",
    "CREATE ACCOUNT.png",
    "LOG IN.png",
    "user 1.1.png",
    "user 1.2.png",
    "user 1.3.png",
    "user 1.4.png",
    "user 1.5.png",
    "user 1.6.png",
    "user 1.7.png",
    "user 1.8.png",
  ],
).concat(
  createProjectPreviewImages(
    "Car Rental Management System",
    "CAR RENTAL MODULES",
    "admin",
    [
      "admin 1.1.png",
      "admin 1.2.png",
      "admin 1.3.png",
      "admin 1.4.png",
      "admin 1.5.png",
      "admin 1.6.png",
      "admin 1.7.png",
      "admin 1.8.png",
      "admin 1.9.png",
      "admin 1.10.png",
      "admin 1.11.png",
    ],
  ),
  createProjectPreviewImages(
    "Car Rental Management System",
    "CAR RENTAL MODULES",
    "rental-agent",
    [
      "agent 1.1.png",
      "agent 1.2.png",
      "agent 1.3.png",
      "agent 1.4.png",
      "agent 1.5.png",
      "agent 1.6.png",
      "agent 1.7.png",
      "CR ABOUT.png",
      "CR CONTACTS.png",
      "CR PRIVACY POLICY.png",
    ],
  ),
);

const bnnPreviewCategories: ProjectPreviewCategory[] = [
  { id: "screens", label: "Screens" },
];

const bnnPreviewImages = createProjectPreviewImages(
  "BNN Donor Mobile App",
  "BNN MOBILE APP",
  "screens",
  [
    "BNN  (1).jpg",
    "BNN  (2).jpg",
    "BNN  (3).jpg",
    "BNN  (4).jpg",
    "BNN  (5).jpg",
    "BNN  (6).jpg",
  ],
);

const pinoyHealthBuddyPreviewCategories: ProjectPreviewCategory[] = [
  { id: "screens", label: "Screens" },
];

const pinoyHealthBuddyPreviewImages = createProjectPreviewImages(
  "Pinoy Health Buddy",
  "PINOY HEALTH BUDDY",
  "screens",
  [
    "PHB 1 (1).png",
    "PHB 1 (3).png",
    "PHB 1 (4).png",
    "PHB 1 (5).png",
    "PHB 1 (6).png",
    "PHB 1 (7).png",
    "PHB 1 (8).png",
    "PHB 1 (9).png",
    "PHB 1 (10).png",
  ],
);

const qaSheetTrackerPreview: ExperienceSpreadsheetPreview = {
  sheets: [
    {
      columns: [
        "Search ID",
        "Component",
        "Steps",
        "Expected Result",
        "Test Result",
        "Status",
        "Notes & Actions Needed",
        "Assigned To",
        "Tester",
        "Priority",
      ],
      name: "Non-authenticated user",
      rows: [
        [
          "1.0",
          "Initial Page",
          "Search",
          "See landing page displaying Blood Network details.",
          "Displayed landing page as expected.",
          "Pass",
          "",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "2.0",
          "Login BTN",
          "Search BBN, then click Login BTN.",
          "Redirect to login page.",
          "Displayed login page.",
          "Pass",
          "",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "3.0",
          "Register BTN",
          "Search BBN, then click Register BTN.",
          "Redirect to register page.",
          "Displayed register page.",
          "Pass",
          "",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "4.0",
          "Fullname Input field",
          "Go to Register, test digits, special chars, and blank input.",
          "Only accepts letters.",
          "Field accepts numeric characters.",
          "Pass",
          "Validation should accept letters only.",
          "Jesse",
          "Jayr",
          "Choose",
        ],
      ],
    },
    {
      columns: [
        "Search ID",
        "Component",
        "Steps",
        "Expected Result",
        "Test Result",
        "Status",
        "Notes & Actions Needed",
        "Assigned To",
        "Tester",
        "Priority",
      ],
      name: "Donor",
      rows: [
        [
          "1.0",
          "Edit BTN",
          "Login as a donor, then click Edit BTN.",
          "Trigger edit in donor info.",
          "Triggered edit in donor info.",
          "Pass",
          "",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "2.0",
          "Upload photo BTN",
          "Login as a donor, click Upload BTN, then submit a photo.",
          "Accepts profile photo.",
          "Accepted image upload.",
          "Pass",
          "",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "3.0",
          "Fullname Input",
          "Login as donor, test letters, digits, special chars, and blank field.",
          "Accepts letters only.",
          "Field accepts numeric characters and special chars.",
          "Failed",
          "Prevent submission if empty and accept letters only.",
          "Choose Dev",
          "Jayr",
          "Medium",
        ],
        [
          "4.0",
          "DOB input",
          "Login as donor, edit profile, test future years and age below 16.",
          "Accepts valid age only.",
          "Did not validate age and can be adjusted up to 2026.",
          "Failed",
          "Prevent submission if age is not valid.",
          "Choose Dev",
          "Jayr",
          "Medium",
        ],
      ],
    },
    {
      columns: [
        "Test Case ID",
        "Feature",
        "Account Role",
        "Component",
        "Steps",
        "Expected Result",
        "Test Result",
        "Status",
        "Assigned To",
        "Tester",
        "Priority",
      ],
      name: "Authenticated Users",
      rows: [
        [
          "1.0",
          "Dashboard",
          "Staff / Admin",
          "Staff Dashboard",
          "Login as authorized user.",
          "Redirect to dashboard.",
          "Displayed dashboard.",
          "Pass",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "2.0",
          "Dashboard",
          "Staff / Admin",
          "Summary box: Total donors",
          "Login, click dashboard block, open first summary box, then count table records.",
          "Redirect to Donor Management and display accurate summary results.",
          "Displayed Donor Management but the total record was not synced.",
          "Pass",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "3.0",
          "Dashboard",
          "Staff / Admin",
          "Summary box: Blood Inventory",
          "Login, click dashboard block, open second summary box, then count table records.",
          "Redirect to Inventory Management and display accurate summary results.",
          "Displayed Inventory Management but totals were not synced.",
          "Pass",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
        [
          "4.0",
          "Dashboard",
          "Staff / Admin",
          "Summary box: Blood Events",
          "Login, click dashboard block, open third summary box, then count table records.",
          "Redirect to Event Management and display accurate results.",
          "Displayed Event Management page.",
          "Pass",
          "Choose Dev",
          "Jayr",
          "Choose",
        ],
      ],
    },
    {
      columns: [
        "Test Case ID",
        "Device Type",
        "Steps",
        "Page",
        "Component",
        "Outcomes",
        "Status",
        "Notes/Suggestions",
        "Tester",
        "Priority",
      ],
      name: "Responsive Testing Report",
      rows: [
        [
          "TC0001",
          "Mobile",
          "Search BNN and view each component.",
          "BNN Landing Page",
          "Impact this Month section",
          "Layout responsive and text aligned properly.",
          "Passed",
          "",
          "Jayr",
          "Choose",
        ],
        [
          "TC0002",
          "Mobile",
          "Search BNN and view each component.",
          "BNN Landing Page",
          "Reg. & find BD BTN",
          "Layout responsive and button aligns properly.",
          "Passed",
          "",
          "Jayr",
          "Choose",
        ],
        [
          "TC0003",
          "Mobile",
          "Search BNN and view each component.",
          "BNN Landing Page",
          "Main H1, H2, and paragraphs",
          "Layout responsive and text sizing was balanced.",
          "Passed",
          "",
          "Jayr",
          "Choose",
        ],
        [
          "TC0004",
          "Mobile",
          "Search BNN and view each component.",
          "BNN Landing Page",
          "Cards: Save Lives, Join Com., Health Benefits",
          "Layout responsive and elements aligned properly.",
          "Passed",
          "",
          "Jayr",
          "Choose",
        ],
      ],
    },
  ],
};

// Kept temporarily as a source reference while the workbook preview is disabled.
void qaSheetTrackerPreview;

const internshipProofItems: ExperienceProofItem[] = [
  {
    alt: "Bug report proof from internship QA and issue tracking work",
    href: "/experience-proofs/intern/bug%20report%20proof.png",
    label: "Bug report proof",
    src: "/experience-proofs/intern/bug%20report%20proof.png",
    type: "document",
  },
  {
    alt: "Internship website proof screenshot one",
    href: "/experience-proofs/intern/proof%201.jpg",
    label: "Coordinated with stakeholders pic",
    src: "/experience-proofs/intern/proof%201.jpg",
    type: "photo",
  },
  {
    alt: "Internship website proof screenshot two",
    href: "/experience-proofs/intern/proof%202.jpg",
    label: "Coordinated with stakeholders pic 2",
    src: "/experience-proofs/intern/proof%202.jpg",
    type: "photo",
  },
  {
    alt: "Mobile workflow demo video from internship work",
    href: "/experience-proofs/intern/mobile.mp4",
    label: "Mobile workflow demo",
    src: "/experience-proofs/intern/mobile.mp4",
    type: "video",
  },
  {
    alt: "QR camera feature demo video from internship work",
    href: "/experience-proofs/intern/qr%20cam%20feature.mp4",
    label: "QR camera feature",
    src: "/experience-proofs/intern/qr%20cam%20feature.mp4",
    type: "video",
  },
  {
    alt: "Responsiveness and UX improvement demo video from internship work",
    href: "/experience-proofs/intern/responsiveness%20%26%20UX%20improvements.mp4",
    label: "Responsiveness and UX",
    src: "/experience-proofs/intern/responsiveness%20%26%20UX%20improvements.mp4",
    type: "video",
  },
];

const mcdoProofItems: ExperienceProofItem[] = [
  {
    alt: "McDonald's certificate of appreciation for standout performer for June 2025",
    href: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.24_1.jpeg",
    label: "Standout performer certificate",
    src: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.24_1.jpeg",
    type: "certificate",
  },
  {
    alt: "McDonald's certificate of appreciation for station champion service sunshine for September 2023",
    href: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.25_1.jpeg",
    label: "Service sunshine certificate",
    src: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.25_1.jpeg",
    type: "certificate",
  },
  {
    alt: "McDonald's certificate of appreciation for station champion chicken McDo master for June 2025",
    href: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.26_1.jpeg",
    label: "Chicken McDo master certificate",
    src: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.26_1.jpeg",
    type: "certificate",
  },
  {
    alt: "Chicken station expert recognition photo from McDonald's service crew experience",
    href: "/experience-proofs/mcdo/chx%20expert1.jpg",
    label: "Chicken expert",
    src: "/experience-proofs/mcdo/chx%20expert1.jpg",
    type: "photo",
  },
  {
    alt: "Chicken station proof photo from McDonald's service crew experience",
    href: "/experience-proofs/mcdo/chix%202.jpg",
    label: "Chicken station",
    src: "/experience-proofs/mcdo/chix%202.jpg",
    type: "photo",
  },
  {
    alt: "Sunshine service recognition photo from McDonald's service crew experience",
    href: "/experience-proofs/mcdo/serv%20sunshine.jpg",
    label: "Service sunshine",
    src: "/experience-proofs/mcdo/serv%20sunshine.jpg",
    type: "photo",
  },
  {
    alt: "Standout McDonald's recognition photo from service crew experience",
    href: "/experience-proofs/mcdo/standout%20mcdo.jpg",
    label: "Standout McDo",
    src: "/experience-proofs/mcdo/standout%20mcdo.jpg",
    type: "photo",
  },
];

const benchProofItems: ExperienceProofItem[] = [
  {
    alt: "Certificate of employment proof for Bench stock clerk experience",
    href: "/experience-proofs/intern/bench/coe%20bench.jpg",
    label: "Employment certificate",
    src: "/experience-proofs/intern/bench/coe%20bench.jpg",
    type: "certificate",
  },
];

const jollibeeProofItems: ExperienceProofItem[] = [
  {
    alt: "Certificate of employment proof for Jollibee service crew experience",
    href: "/experience-proofs/intern/jb/coe%20jb.jpg",
    label: "Employment certificate",
    src: "/experience-proofs/intern/jb/coe%20jb.jpg",
    type: "certificate",
  },
];

const grcProofItems: ExperienceProofItem[] = [
  {
    alt: "Computer laboratory one setup proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/lab%201%20setting%20up.jpg",
    label: "Lab 1 setup",
    src: "/experience-proofs/grc%20it%20dept/lab%201%20setting%20up.jpg",
    type: "photo",
  },
  {
    alt: "Computer laboratory one setup continuation proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/lab%201%20setup.jpg",
    label: "Lab 1 setup 2",
    src: "/experience-proofs/grc%20it%20dept/lab%201%20setup.jpg",
    type: "photo",
  },
  {
    alt: "Computer laboratory one setup detail proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/lab%201%20setup%202.jpg",
    label: "Lab 1 setup 3",
    src: "/experience-proofs/grc%20it%20dept/lab%201%20setup%202.jpg",
    type: "photo",
  },
  {
    alt: "Computer laboratory one maintenance proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/lab%201%20maintenance%202.jpg",
    label: "Lab 1 maintenance",
    src: "/experience-proofs/grc%20it%20dept/lab%201%20maintenance%202.jpg",
    type: "photo",
  },
  {
    alt: "Computer laboratory two maintenance proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/lab%202%20maintenance%202.jpg",
    label: "Lab 2 maintenance",
    src: "/experience-proofs/grc%20it%20dept/lab%202%20maintenance%202.jpg",
    type: "photo",
  },
  {
    alt: "PC maintenance proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/pc%20maintenace.jpg",
    label: "PC maintenance",
    src: "/experience-proofs/grc%20it%20dept/pc%20maintenace.jpg",
    type: "photo",
  },
  {
    alt: "PC cleanup proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/pc%20cleanup.jpg",
    label: "PC cleanup",
    src: "/experience-proofs/grc%20it%20dept/pc%20cleanup.jpg",
    type: "photo",
  },
  {
    alt: "Educational technology maintenance proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/ed%20tech%20maintenance.jpg",
    label: "Ed tech maintenance",
    src: "/experience-proofs/grc%20it%20dept/ed%20tech%20maintenance.jpg",
    type: "photo",
  },
  {
    alt: "New faculty LAN cable installation proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/new%20lan%20cable%20faculty.jpg",
    label: "LAN cable setup",
    src: "/experience-proofs/grc%20it%20dept/new%20lan%20cable%20faculty.jpg",
    type: "photo",
  },
  {
    alt: "Library maintenance proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/library%20maintetance.jpg",
    label: "Library maintenance",
    src: "/experience-proofs/grc%20it%20dept/library%20maintetance.jpg",
    type: "photo",
  },
  {
    alt: "Faculty PC troubleshooting proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/faculty%20pc%20troubleshooting.jpg",
    label: "Faculty PC troubleshooting",
    src: "/experience-proofs/grc%20it%20dept/faculty%20pc%20troubleshooting.jpg",
    type: "photo",
  },
  {
    alt: "Lab 3 PC setup proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/new%20pc%20for%20lab%203%20setting%20up.jpg",
    label: "Lab 3 PC setup",
    src: "/experience-proofs/grc%20it%20dept/new%20pc%20for%20lab%203%20setting%20up.jpg",
    type: "photo",
  },
  {
    alt: "Lab 3 PC setup continuation proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/new%20pc%20for%20lab%203%20setting%20up%202.jpg",
    label: "Lab 3 PC setup 2",
    src: "/experience-proofs/grc%20it%20dept/new%20pc%20for%20lab%203%20setting%20up%202.jpg",
    type: "photo",
  },
  {
    alt: "Lab 3 PC setup detail proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/new%20pc%20for%20lab%203%20setting%20up%203.jpg",
    label: "Lab 3 PC setup 3",
    src: "/experience-proofs/grc%20it%20dept/new%20pc%20for%20lab%203%20setting%20up%203.jpg",
    type: "photo",
  },
  {
    alt: "Storage device upgrade and software installation proof from Global Reciprocal Colleges IT department work",
    href: "/experience-proofs/grc%20it%20dept/storage%20device%20upgrade%20OS%20installation%20and%20software%20installation%20for%20EDTech%20PC.jpg",
    label: "EDTech PC upgrade and installation",
    src: "/experience-proofs/grc%20it%20dept/storage%20device%20upgrade%20OS%20installation%20and%20software%20installation%20for%20EDTech%20PC.jpg",
    type: "photo",
  },
];

export const certificates: Certificate[] = [
  {
    credentialId: "UC-4dfd695d-6fd5-4a7f-b6e2-8a1ee8660bfa",
    href: "/experience-proofs/tech%20certs/css.jpg",
    imageAlt: "Udemy certificate for Learn CSS - For Beginners",
    imageSrc: "/experience-proofs/tech%20certs/css.jpg",
    issued: "April 5, 2026",
    issuer: "Udemy · YouAccel Training",
    skills: ["CSS", "Frontend"],
    title: "Learn CSS - For Beginners",
    type: "Technical Certificate",
  },
  {
    credentialId: "UC-3756d583-c6cf-4eb9-b850-c3a336c028ee",
    href: "/experience-proofs/tech%20certs/react.jpg",
    imageAlt:
      "Udemy certificate for Learn React by Building the Simplest App from Scratch",
    imageSrc: "/experience-proofs/tech%20certs/react.jpg",
    issued: "April 5, 2026",
    issuer: "Udemy · Pierre Henry",
    skills: ["React", "JavaScript", "Frontend"],
    title: "Learn React by Building the Simplest App from Scratch",
    type: "Technical Certificate",
  },
  {
    credentialId: "UC-b3b7f6f8-d39c-4b40-b9cf-8c6d222f0f22",
    href: "/experience-proofs/tech%20certs/php,%20js,%20bootstrap.jpg",
    imageAlt:
      "Udemy certificate for JavaScript, Bootstrap, and PHP certification for beginners",
    imageSrc: "/experience-proofs/tech%20certs/php,%20js,%20bootstrap.jpg",
    issued: "April 5, 2026",
    issuer: "Udemy · YouAccel Training",
    skills: ["JavaScript", "Bootstrap", "PHP"],
    title: "JavaScript, Bootstrap, & PHP - Certification for Beginners",
    type: "Technical Certificate",
  },
  {
    href: "/experience-proofs/seminars%20certs/41.png",
    imageAlt:
      "Certificate of participation for the From Student to Professional seminar",
    imageSrc: "/experience-proofs/seminars%20certs/41.png",
    issued: "February 21, 2026",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: ["Career Readiness", "Professional Development"],
    title:
      "From Student to Professional: How to Get Hired, Add Value, and Not Get Lost in Your First Year of Work",
    type: "Seminar Certificate",
  },
  {
    href: "/experience-proofs/seminars%20certs/63.png",
    imageAlt:
      "Certificate of participation for the AI Leveling seminar about the future of IT careers",
    imageSrc: "/experience-proofs/seminars%20certs/63.png",
    issued: "February 21, 2026",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: ["AI", "Career Growth", "IT Trends"],
    title: "AI Leveling: How AI is Shaping the Future of IT Careers",
    type: "Seminar Certificate",
  },
  {
    href: "/experience-proofs/seminars%20certs/36.png",
    imageAlt:
      "Certificate of appreciation for the Breaking into Tech seminar about AWS fundamentals and technical interviews",
    imageSrc: "/experience-proofs/seminars%20certs/36.png",
    issued: "February 28, 2026",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: ["AWS Fundamentals", "Technical Interviews", "Career Preparation"],
    title: "Breaking into Tech: AWS Fundamentals & Acing Technical Interviews",
    type: "Seminar Certificate",
  },
  {
    href: "/experience-proofs/seminars%20certs/28.png",
    imageAlt:
      "Certificate of appreciation for the What Minecraft Taught Me About Data Architecture seminar",
    imageSrc: "/experience-proofs/seminars%20certs/28.png",
    issued: "February 28, 2026",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: [
      "Data Architecture",
      "Systems Thinking",
      "Creative Problem Solving",
    ],
    title: "What Minecraft Taught Me About Data Architecture",
    type: "Seminar Certificate",
  },
  {
    href: "/experience-proofs/school%20certs/CamScanner%206-10-26%2017.26(1)_1.jpeg",
    imageAlt:
      "School certificate of participation for OJT Conference 2026 Breakthrough: Unleashing Your Potential 2026",
    imageSrc:
      "/experience-proofs/school%20certs/CamScanner%206-10-26%2017.26(1)_1.jpeg",
    issued: "March 4, 2026",
    issuer: "Global Reciprocal Colleges",
    skills: ["OJT Conference", "Professional Growth", "Career Preparation"],
    title: "Breakthrough: Unleashing Your Potential 2026",
    type: "School Certificate",
  },
  {
    href: "/experience-proofs/school%20certs/CamScanner%206-10-26%2017.27(1)_1.jpeg",
    imageAlt:
      "School certificate of recognition for champion in the 30-second CCS promotional video contest",
    imageSrc:
      "/experience-proofs/school%20certs/CamScanner%206-10-26%2017.27(1)_1.jpeg",
    issued: "June 9, 2023",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: ["Video Contest", "Creative Communication", "School Recognition"],
    title: "Champion - 30-second CCS Promotional Video Contest",
    type: "School Certificate",
  },
  {
    href: "/experience-proofs/school%20certs/CamScanner%206-10-26%2017.27_1.jpeg",
    imageAlt:
      "School certificate of recognition for second place in programming battle during college week",
    imageSrc:
      "/experience-proofs/school%20certs/CamScanner%206-10-26%2017.27_1.jpeg",
    issued: "June 9, 2023",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: ["Programming Battle", "Team Competition", "School Recognition"],
    title: "2nd Place - Programming Battle",
    type: "School Certificate",
  },
  {
    href: "/experience-proofs/school%20certs/colloq.jpg",
    imageAlt:
      "School certificate of recognition for presenting the Smart POS capstone during the CCS Research Colloquium 2026",
    imageSrc: "/experience-proofs/school%20certs/colloq.jpg",
    issued: "March 18, 2026",
    issuer: "Global Reciprocal Colleges / College of Computer Studies",
    skills: ["Capstone Presentation", "Research Colloquium", "Smart POS"],
    title: "CCS Research Colloquium 2026 Presenter Recognition",
    type: "School Certificate",
  },
  {
    href: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.25_1.jpeg",
    imageAlt:
      "McDonald's certificate of appreciation for being recognized as station champion service sunshine for September 2023",
    imageSrc: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.25_1.jpeg",
    issued: "September 2023",
    issuer: "Golden Arches Development Corporation - McDonald's",
    skills: ["Customer Service", "Guest Experience", "Service Excellence"],
    title: "Station Champion - Service Sunshine",
    type: "Work Recognition Certificate",
  },
  {
    href: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.24_1.jpeg",
    imageAlt:
      "McDonald's certificate of appreciation for being the standout performer for June 2025",
    imageSrc: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.24_1.jpeg",
    issued: "June 2025",
    issuer: "Golden Arches Development Corporation - McDonald's",
    skills: ["Customer Service", "Team Performance", "Service Operations"],
    title: "Standout Performer",
    type: "Work Recognition Certificate",
  },
  {
    href: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.26_1.jpeg",
    imageAlt:
      "McDonald's certificate of appreciation for being recognized as station champion chicken McDo master for June 2025",
    imageSrc: "/experience-proofs/mcdo/CamScanner%206-10-26%2017.26_1.jpeg",
    issued: "June 2025",
    issuer: "Golden Arches Development Corporation - McDonald's",
    skills: ["Food Preparation", "Kitchen Operations", "Station Mastery"],
    title: "Station Champion - Chicken McDo Master",
    type: "Work Recognition Certificate",
  },
];

export const profile: Profile = {
  name: "Cornelio A. Gatbonton Jr",
  role: "IT Professional | Development, Support, Testing & QA",
  email: "corneliogatbontonjr21@gmail.com",
  location: "Manila, Philippines",
  logoAlt: "JayScript brand logo",
  logoSrc: "/Logo/JayScript%20Logo.svg",
  linkedinUrl:
    "https://www.linkedin.com/in/corneliogatbonton/?skipRedirect=true",
  facebookUrl: "https://www.facebook.com/corneliogatbonton/",
  githubUrl: "https://github.com/Jay-Scripts",
  resumeUrl: "/resume.pdf",
  summary: [
    "Adaptable IT professional with hands-on experience in software development, technical support, software testing, and quality assurance through internship, academic, and project-based work.",
    "I combine troubleshooting, clear documentation, attention to detail, and user-focused thinking to help teams build, validate, and support reliable digital systems.",
  ],
};

export const navigationItems: NavigationItem[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const serviceOfferings: ServiceOffering[] = [
  {
    title: "Software Development",
    icon: Code2,
    description:
      "Build responsive, user-friendly applications and business workflows using modern frontend, backend, and database technologies.",
  },
  {
    title: "Technical Support",
    icon: Headphones,
    description:
      "Troubleshoot user and system issues, explain solutions clearly, and help keep day-to-day technology reliable and accessible.",
  },
  {
    title: "Software Testing",
    icon: TestTube2,
    description:
      "Test features, user flows, edge cases, and responsive behavior to identify defects before they affect users.",
  },
  {
    title: "Quality Assurance",
    icon: ShieldCheck,
    description:
      "Support consistent quality through careful validation, defect reporting, regression checks, and attention to requirements.",
  },
  {
    title: "Documentation & Handoff",
    icon: FileText,
    description:
      "Create clear system documentation, flowcharts, user guides, and handoff materials that help teams and users succeed.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "Next.js",
      "React",
      "JavaScript ES6",
      "TypeScript",
      "Tailwind CSS",
      "Flowbite",
      "shadcn/ui",
      "Lucide React",
      "Bootstrap",
    ],
  },
  {
    title: "Backend and Database",
    icon: Database,
    skills: ["Supabase", "PostgreSQL", "PHP", "MySQL", "Node.js"],
  },
  {
    title: "Technical Support & Troubleshooting",
    icon: Headphones,
    skills: [
      "Issue Diagnosis",
      "Software Troubleshooting",
      "Windows Support",
      "Basic Network Troubleshooting",
      "Hardware & Peripheral Setup",
      "Software Installation & Configuration",
      "User Support",
      "Incident Documentation",
    ],
  },
  {
    title: "Testing and QA/Tester",
    icon: TestTube2,
    skills: [
      "Functional Testing",
      "Integration Testing",
      "UAT",
      "Bug Documentation",
    ],
  },
  {
    title: "Development Tooling",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "npm",
      "pnpm",
      "Vercel",
      "XAMPP",
      "Laragon",
      "MySQL Workbench",
      "Codex",
      "Claude Code",
      "Cursor",
      "VS Code",
      "Playwright",
      "Obsidian",
      "Graphify",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "smart-pos",
    title: "Smart POS System",
    summary:
      "Client-server Smart POS system with cashier, kiosk, customer display, barista, and manager modules that streamlines ordering, queue tracking, analytics, and transaction workflows.",
    primaryCategory: "pos",
    categories: ["pos"],
    techStack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "Chart.js"],
    architecture: [
      "POS interface",
      "Self-Service Kiosk",
      "Customer View System",
      "Barista View System",
      "Manager Dashboard",
      "Inventory automation",
      "Customer Satisfaction Rating",
    ],
    features: [
      "Unified ordering and transaction workflow across cashier, kiosk, and service stations",

      "Real-time order status and queue tracking to improve service flow and reduce customer waiting time",
      "Automated receipt generation, sales reporting, and transaction record management",
      "Manager dashboard with sales analytics and operational performance insights",
      "QR code-based staff authentication for faster login and reduced workstation switching time",
    ],
    challenges: [
      "Addressed slow and fragmented order processing by integrating POS, kiosk, customer display, and barista workflows into a unified system.",
      "Reduced manual tracking errors in orders, payments, and inventory through automated real-time synchronization across modules.",
      "Improved operational efficiency during high-volume transactions with automated queue management and order status tracking.",
      "Enabled data-driven decision-making through centralized sales reporting, analytics, and customer satisfaction monitoring.",
    ],
    githubUrl: "https://github.com/Jay-Scripts/CAPSTONE-SMART-POS",
    liveDemoUrl: "https://example.com/",
    previewAlt: "Smart POS system dashboard preview",
    previewDesktopSrc:
      "/project%20preview/SMART%20POS%20MODULES/Smart%20POS%20Portrait%20Cover.png",
    previewCompactSrc:
      "/project%20preview/SMART%20POS%20MODULES/Smart%20POS%20Landscape%20Cover.png",
    previewLayout: "landscape",
    previewSrc: "/project%20preview/smart%20pos.png",
    previewImages: smartPosPreviewImages,
    previewCategories: smartPosPreviewCategories,
    recognitionPreviewAlt:
      "Recognition certificate for presenting the Smart POS capstone during the CCS Research Colloquium 2026",
    recognitionPreviewNote:
      "Recognition proof for presenting the Smart POS capstone project during the CCS Research Colloquium 2026.",
    recognitionPreviewSrc: "/experience-proofs/school%20certs/colloq.jpg",
    recognitionPreviewTitle: "CCS Research Colloquium 2026 Recognition",
    systemPreviewAlt: "Smart POS system preview walkthrough video",
    systemPreviewNote: "System walkthrough video for the Smart POS project.",
    systemPreviewSrc: "/project%20preview/Videos/SMART%20POS%20Video.mp4",
  },
  {
    id: "smart-pos-system-flowchart",
    title: "Smart POS System Flowchart",
    summary:
      "System flow documentation for the Smart POS ecosystem showing how kiosk, cashier, customer display, barista, manager, CRM, and database modules connect.",
    primaryCategory: "system-flowcharts",
    categories: ["system-flowcharts"],
    techStack: [
      "System Analysis",
      "Process Mapping",
      "Workflow Documentation",
      "Module Architecture",
    ],
    architecture: [],
    features: [],

    flowchartPreviews: smartPosFlowchartPreviews,
    previewAlt: "Smart POS system flowchart preview for the options module",
    previewDesktopSrc:
      "/project%20preview/SMART%20POS%20DOCUMENTATION/Smart%20POS%20System%20Flowchart%20Portrait%20Cover.png",
    previewCompactSrc:
      "/project%20preview/SMART%20POS%20DOCUMENTATION/Smart%20POS%20System%20Flowchart%20Landscape%20Cover.png",
    previewSrc: "/sysflow-svg/SYSTEM FLOW SMART POS-Options Module.drawio.svg",
    challenges: [
      "Aligned multiple POS modules (kiosk, cashier, barista, CRM, and manager) into a unified flow that reflects real store operations.",
      "Clarified order-to-fulfillment handoffs to reduce confusion between ordering, payment, preparation, and reporting stages.",
      "Converted business workflow logic into a clear flowchart to support operational planning, training, and process improvement.",
    ],
    githubUrl: "https://github.com/Jay-Scripts",
    liveDemoUrl: "/sysflow-svg/SYSTEM FLOW SMART POS-Options Module.drawio.svg",
  },
  {
    id: "car-rental",
    title: "Car Rental Management System",
    summary:
      "Centralized booking and rental management system with customer and admin modules for reservations, fleet monitoring, and reporting workflows.",
    primaryCategory: "booking-&-reservation",
    categories: ["booking-&-reservation"],
    techStack: [
      "JavaScript",
      "Tailwind CSS",
      "Nodemailer",
      "PHP",
      "MySQL",
      "Chart.js",
      "Flowbite",
    ],
    architecture: [
      "Customer module",
      "Admin module",
      "Rental agent module",
      "Centralized booking and transaction flow",
    ],
    features: [
      "Role-based rental system for customers, admins, and rental agents to manage booking lifecycle",
      "Vehicle inventory tracking with real-time availability and status updates",
      "Admin dashboard for monitoring bookings, sales, and rental performance",
      "Email notifications for booking confirmations and status updates using Nodemailer",
    ],

    challenges: [
      "Designed and refined relationships between bookings, customers, vehicles, and transactions to avoid data duplication and ensure consistent rental records.",
      "Improved admin visibility by building clear status flows for bookings, payments, and vehicle availability to reduce confusion during operations.",
      "Handled real-world booking flow issues by adding validation and email notifications to ensure customers receive accurate rental updates and confirmations.",
    ],
    githubUrl: "https://github.com/Jay-Scripts/CAR-RENTAL-SYSTEM-.git",
    liveDemoUrl: "https://example.com/",
    previewAlt: "Car rental management system dashboard preview",
    previewDesktopSrc:
      "/project%20preview/CAR%20RENTAL%20MODULES/Car%20Rental%20Portrait%20Cover.png",
    previewCompactSrc:
      "/project%20preview/CAR%20RENTAL%20MODULES/Car%20Rental%20Landscape%20Cover.png",
    previewLayout: "landscape",
    previewSrc: "/project%20preview/car%20rental.png",
    previewImages: carRentalPreviewImages,
    previewCategories: carRentalPreviewCategories,
    systemPreviewAlt: "Car rental system preview walkthrough video",
    systemPreviewNote:
      "System walkthrough video for the Car Rental Management System.",
    systemPreviewSrc: "/project%20preview/Videos/Car%20Rental%20Video.mp4",
  },
  {
    id: "pinoy-health-buddy",
    title: "Pinoy Health Buddy",
    summary:
      "Responsive school hackathon web app built during Web Systems that provides AI chat-based meal and workout suggestions for a selected location, plus badges, rewards, and task tracking.",
    primaryCategory: "ai-chat-bot",
    categories: ["ai-chat-bot"],
    techStack: [
      "Web Systems",
      "AI Chat",
      "Responsive Design",
      "Task Tracker",
      "Gamification",
    ],
    architecture: [
      "AI chat box for meal suggestions",
      "Workout suggestions by selected location",
      "Badge and reward system",
      "Task tracker",
      "Mobile-first responsive layout",
    ],
    features: [
      "Chat-based meal and workout recommendations",
      "Location-aware suggestions for healthier planning",
      "Task tracking with progress visibility",
      "Badges and rewards for user motivation",
    ],
    challenges: [
      "Built a unified system that combines AI meal/workout suggestions with task tracking and gamification without overwhelming the user experience.",
      "Improved usability across mobile and desktop by ensuring all features remained accessible and readable on different screen sizes.",
      "Solved the problem of low user motivation by integrating badges, rewards, and progress tracking into daily health-related activities.",
    ],
    githubUrl:
      "https://github.com/Jay-Scripts/Pinoy-Health-Buddy-x-WebSys-InfoSec",
    liveDemoUrl: "/project%20preview/PINOY%20HEALTH%20BUDDY/PHB%201%20(1).png",
    projectBadges: ["School Hackathon", "School Project"],
    previewAlt: "Pinoy Health Buddy web app preview",
    previewDesktopSrc:
      "/project%20preview/PINOY%20HEALTH%20BUDDY/PNB%20Portrait%20Cover.png",
    previewCompactSrc:
      "/project%20preview/PINOY%20HEALTH%20BUDDY/PHB%20Landscape%20Cover.png",
    previewLayout: "landscape",
    previewSrc: "/project%20preview/PINOY%20HEALTH%20BUDDY/PHB%201%20(1).png",
    previewImages: pinoyHealthBuddyPreviewImages,
    previewCategories: pinoyHealthBuddyPreviewCategories,
    systemPreviewAlt: "Pinoy Health Buddy web app preview walkthrough video",
    systemPreviewNote:
      "System walkthrough video for the Pinoy Health Buddy web app.",
    systemPreviewSrc: "/project%20preview/Videos/PHB%20web.mp4",
  },
  {
    id: "bnn-donor-mobile-app",
    title: "BNN Donor Mobile App",
    summary:
      "Internship-built donor-facing mobile application that helps users book blood donation events, review participation activity, and track their personal donation history through a mobile-first experience.",
    primaryCategory: "android",
    categories: ["android"],
    techStack: [
      "Expo React Native",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
    ],
    architecture: [
      "Mobile donor authentication flow",
      "Event booking interface",
      "Donation participation records",
      "Personal donation history",
      "Supabase-backed data syncing",
    ],
    features: [
      "Donor-focused event booking from a mobile interface",
      "Access to participation records and personal donation history",
      "Improved mobile usability during internship delivery and testing",
      "Built to support responsive, recruiter-visible product thinking in a real internship environment",
    ],
    challenges: [
      "Solved the difficulty of managing donor bookings on mobile by building a simplified, mobile-first application flow for easier access to events and records.",
      "Addressed readability and interaction issues on small screens by redesigning key screens for schedules, donation history, and participation tracking.",
      "Improved donor accessibility by building an app that allows users to manage bookings and donation history based on real stakeholder requirements and feedback.",
    ],
    githubUrl: "https://github.com/Jay-Scripts",
    liveDemoUrl: "https://example.com/",
    projectBadges: ["Intern", "Little Ark Foundation"],
    previewAlt: "BNN Donor mobile app preview page 1",
    previewDesktopSrc:
      "/project%20preview/BNN%20MOBILE%20APP/BNN%20Mobile%20Portrait%20Cover.png",
    previewCompactSrc:
      "/project%20preview/BNN%20MOBILE%20APP/BNN%20Mobile%20Landscape%20Cover.png",
    previewLayout: "portrait",
    previewSurface: "expanded",
    previewSrc: bnnPreviewImages[0].src,
    previewImages: bnnPreviewImages,
    previewCategories: bnnPreviewCategories,
    systemPreviewAlt: "BNN Donor mobile app preview walkthrough video",
    systemPreviewNote: "System walkthrough video for the BNN Donor mobile app.",
    systemPreviewSrc:
      "/project%20preview/Videos/BNN%20mobile%20app%20video.mp4",
  },
  {
    id: "smart-pos-user-manual",
    title: "Smart POS User Manual",
    summary:
      "Step-by-step product documentation covering core Smart POS workflows, guided usage, and operator reference material for day-to-day system handling.",
    primaryCategory: "user-manuals",
    categories: ["user-manuals"],
    techStack: ["PDF Documentation", "Process Mapping", "User Guidance"],
    architecture: [],
    features: [],
    challenges: [
      "Translated complex POS workflows into step-by-step instructions that staff can follow during actual store operations.",
      "Reduced training confusion by structuring procedures in a clear, consistent format suitable for new and existing users.",
      "Documented system behavior in a way that supports real-time usage, minimizing operational errors during daily transactions.",
    ],
    githubUrl: "https://github.com/Jay-Scripts",
    liveDemoUrl: "/user-manual/SMART%20POS%20USER%20MANUAL.pdf",
    previewAlt: "Smart POS user manual front page cover preview",
    previewDesktopSrc:
      "/project%20preview/SMART%20POS%20DOCUMENTATION/Smart%20POS%20User%20Manual%20Portrait%20Cover.png",
    previewCompactSrc:
      "/project%20preview/SMART%20POS%20DOCUMENTATION/Smart%20POS%20User%20Manual%20Landscape%20Cover.png",
    previewDialogSrc:
      "/user-manual/SMART%20POS%20USER%20MANUAL.pdf#page=1&view=FitH",
    previewSrc: "/user-manual/SMART%20POS%20FRONT%20PAGE.png",
  },
];

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer (Intern)",
    organization: "Little Ark Foundation Inc.",
    period: "Nov 2025 - Aug 2026",
    icon: Code2,
    isTechRelated: true,
    proofItems: internshipProofItems,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Expo React Native",
    ],
    highlights: [
      "Developed responsive web and mobile features using Next.js, React, Expo React Native, Supabase, and PostgreSQL.",
      "Designed and executed 700+ QA test cases covering RBAC, validation, responsiveness, UX, and end-to-end workflows.",
      "Implemented system features and resolved bugs to improve workflow reliability and usability.",
      "Created analytics dashboards and interactive charts for monitoring operational data and system performance.",
      "Automated manual work reports into system-generated reports, reducing repetitive reporting tasks.",
      "Developed donor mobile features for event booking, contribution tracking, and donation history.",
      "Collaborated with stakeholders and developers to implement UX improvements and support feature development.",
    ],
  },
  {
    role: "Service Crew",
    organization: "Golden Arches Development Corporation - McDonald's",
    period: "Aug 2022 - Jun 2026",
    icon: ShieldCheck,
    proofItems: mcdoProofItems,
    highlights: [
      "Processed customer orders, prepared food items, maintained cleanliness, and supported daily store operations in a fast-paced service environment.",
      "Troubleshot basic store equipment issues involving monitors, keyboards, mouse devices, HDMI/VGA connections, and POS-related hardware concerns before escalation.",
      "Conducted initial hardware checks and basic preventive maintenance to keep store systems, workstations, and service areas operational.",
    ],
  },
  {
    role: "IT Support Assistant (Student Assistant)",
    organization: "Global Reciprocal Colleges",
    period: "Jul 2022 - Jul 2026",
    icon: Headphones,
    isTechRelated: true,
    proofItems: grcProofItems,
    highlights: [
      "Assisted in setting up and maintaining 2 computer laboratories, including workstation preparation, hardware arrangement, and basic system configuration.",
      "Repaired and maintained PC hardware through soldering, component replacement, system upgrades, and peripheral troubleshooting to support lab operations.",
      "Installed and configured operating systems, software, printers, and lab equipment to support classroom and office use.",
      "Resolved technical support requests from faculty, staff, and departments involving internet connectivity, printer issues, system access problems, and hardware concerns.",
    ],
  },
  {
    role: "Stock Clerk",
    organization: "Be Connected Management Services - Bench",
    period: "Jun 2021 - Jul 2022",
    icon: BriefcaseBusiness,
    proofItems: benchProofItems,
    highlights: [
      "Managed stockroom organization, inventory checking, and item monitoring to support accurate stock handling and daily store operations.",
      "Performed basic store maintenance and hardware support, including cable cleanup, system unit maintenance, POS-related checks, and defective fixture reporting.",
    ],
  },
  {
    role: "Bagger",
    organization: "Rustan Supercenters, Inc. - Shopwise",
    period: "Jun 2020 - Nov 2020",
    icon: BriefcaseBusiness,
    highlights: [
      "Packed customer purchases efficiently and assisted customers during checkout and carry-out support.",
    ],
  },
  {
    role: "Service Crew",
    organization: "Jollibee Food Corporation - Jollibee",
    period: "Sep 2018 - Sep 2019",
    icon: ShieldCheck,
    proofItems: jollibeeProofItems,
    highlights: [
      "Supported customer service, order taking, food preparation, and store cleanliness in a fast-paced team environment.",
    ],
  },
];

export const aboutEntries: AboutEntry[] = [
  {
    title: "Personal details",
    icon: Info,
    description: profile.summary,
  },
  {
    title: "About my goals",
    icon: Target,
    description: [
      "My goal is to grow in a technology role where I can contribute through software development, technical support, software testing, or quality assurance.",

      "I’m motivated by solving problems, helping users, improving software quality, and continuously strengthening both my technical and communication skills.",
    ],
  },
];

export const aboutHighlights = [
  "Software development",
  "Technical support",
  "Software testing",
  "Quality assurance",
] as const;
