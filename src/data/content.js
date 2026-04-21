export const pageLinks = [
  {
    label: { zh: '首頁', en: 'Home' },
    path: '/',
    dropdownTitle: { zh: '品牌入口', en: 'Brand Entry' },
    items: [
      { title: { zh: '品牌介紹', en: 'Brand Story' }, desc: { zh: '主視覺、核心理念與快速入口配置。', en: 'Hero direction, positioning, and quick entry structure.' } },
      { title: { zh: '課程導覽', en: 'Programs' }, desc: { zh: '不同學習方案與服務分類整理。', en: 'Program categories and learning service structure.' } },
      { title: { zh: '最新資訊', en: 'News' }, desc: { zh: '公告、活動與重點內容模組。', en: 'Announcements, events, and highlight modules.' } },
    ],
  },
  {
    label: { zh: '教學品質', en: 'Quality' },
    path: '/quality',
    dropdownTitle: { zh: '品質制度', en: 'Quality System' },
    items: [
      { title: { zh: '教學理念', en: 'Teaching Vision' }, desc: { zh: '教學設計原則與學習陪伴方式。', en: 'How classes are designed and how learners are supported.' } },
      { title: { zh: '品質機制', en: 'Quality Flow' }, desc: { zh: '觀課、回饋、更新與追蹤流程。', en: 'Observation, feedback, update, and follow-up loops.' } },
      { title: { zh: '學習支持', en: 'Learning Support' }, desc: { zh: '學生與家長的支援服務整理。', en: 'Support touchpoints for students and families.' } },
    ],
  },
  {
    label: { zh: '報名流程', en: 'Admissions' },
    path: '/admissions',
    dropdownTitle: { zh: '報名與諮詢', en: 'Admissions Guide' },
    items: [
      { title: { zh: '報名前準備', en: 'Before You Apply' }, desc: { zh: '需求確認、資料填寫與課程建議。', en: 'Needs review, form input, and program matching.' } },
      { title: { zh: '試聽安排', en: 'Trial Session' }, desc: { zh: '諮詢、試聽、班級媒合與通知。', en: 'Consultation, trial setup, class matching, and notice.' } },
      { title: { zh: '常見問題', en: 'FAQ' }, desc: { zh: '時程、收費、補課與請假說明。', en: 'Schedule, pricing, make-up sessions, and leave policy.' } },
    ],
  },
  {
    label: { zh: '教育活動', en: 'Events' },
    path: '/events',
    dropdownTitle: { zh: '活動與合作', en: 'Events & Collaborations' },
    items: [
      { title: { zh: '講座活動', en: 'Talks' }, desc: { zh: '家長講座、公開課與社群論壇。', en: 'Parent talks, public classes, and community forums.' } },
      { title: { zh: '工作坊', en: 'Workshops' }, desc: { zh: '教師培訓、教案設計與實作活動。', en: 'Teacher training, lesson design, and practice sessions.' } },
      { title: { zh: '合作計畫', en: 'Collaborations' }, desc: { zh: '校園、社群與外部夥伴合作內容。', en: 'School, community, and external partnership projects.' } },
    ],
  },
]

export const siteContent = {
  zh: {
    topbar: '文教服務與學習體驗',
    introTitle: '文教品牌四頁網站',
    introText:
      '這是直接在 local 做出的 React + Tailwind 網站，不是靜態草圖。重點是先把四種頁型做出來，再讓教學文件對應這份實作。',
    buildSummaryTitle: '這個本地版本包含',
    buildSummaryItems: [
      '四種文教網站頁型',
      '中文 / English 內容切換',
      'Dark mode 切換',
      '本地 React + Tailwind 實作',
    ],
    nav: ['學習服務', '教學品質', '最新消息', '報名資訊', '教育活動'],
    home: {
      eyebrow: 'HOME PAGE',
      title: '打造更有溫度的學習體驗與教學場域',
      desc:
        '首頁重點是大面積視覺、清楚的主標題、右側快速入口，以及下方正式但不死板的資訊模組。',
      quickLinks: [
        { title: '課程特色', desc: '主題課程 / 分齡方案 / 學習方法' },
        { title: '教學空間', desc: '校區環境 / 教室設備 / 學習支持' },
        { title: '品牌故事', desc: '理念介紹 / 師資團隊 / 家長回饋' },
        { title: '報名資訊', desc: '開課時程 / 報名流程 / 常見問題' },
      ],
      news: ['最新課程消息 01', '校區公告 02', '師生活動 03'],
      highlights: ['本月活動', '教學品質', '報名資訊'],
    },
    audit: {
      breadcrumb: '首頁 / 教學品質 / 品質保證 / 教學品質',
      title: '教學品質',
      desc: '正式閱讀型頁面，重點是 breadcrumb、側欄、文章排版與深淺色可讀性。',
      menu: ['概述', '教學理念', '師資制度', '教學品質', '學習支持'],
      paragraphs: [
        '這個頁型的任務不是讓畫面花俏，而是讓內容穩定、正式、清楚。',
        '左邊的側欄提供品質主題定位，右邊的主內容負責呈現段落、條列與制度說明。',
      ],
      bullets: ['教學觀課與回饋制度', '課程更新與教師培訓流程', '學生與家長意見追蹤'],
    },
    careers: {
      breadcrumb: '首頁 / 報名資訊 / 報名流程',
      title: '報名流程',
      desc: '流程型頁面比文章頁更視覺化，重點在步驟感、卡片感與 FAQ/CTA 區塊節奏。',
      steps: [
        { title: '填寫資料', desc: '建立學生與家長資訊' },
        { title: '需求確認', desc: '確認年齡與課程需求' },
        { title: '體驗安排', desc: '安排試聽或諮詢' },
        { title: '完成報名', desc: '確認班級與時段' },
        { title: '開課準備', desc: '取得入班資訊' },
      ],
      support: ['FAQ', '聯絡課程顧問', '查看開課時程'],
    },
    research: {
      breadcrumb: '首頁 / 教育活動 / 合作計畫 / 活動',
      title: '活動總覽',
      filters: ['全部活動', '講座', '工作坊', '已結束', '即將開始'],
      events: [
        {
          title: '2026 暑期親子學習節',
          desc: '以三欄式列表呈現活動標題、摘要、日期與 CTA。',
          date: '2026/07/10 - 2026/07/16',
        },
        {
          title: '2026 教師教案設計工作坊',
          desc: '保留教育活動頁面較收斂的排版節奏。',
          date: '2026/06/14 - 2026/06/18',
        },
        {
          title: '2026 學習成長論壇',
          desc: '這種頁型重點不是大圖，而是資料排版秩序。',
          date: '2026/05/26 - 2026/05/29',
        },
      ],
    },
  },
  en: {
    topbar: 'Education services and learning experience',
    introTitle: 'Four-page education brand website',
    introText:
      'This is a real local React + Tailwind build, not a static mock. The goal is to build the four page types first and then align the tutorial document to this codebase.',
    buildSummaryTitle: 'What is included in this local build',
    buildSummaryItems: [
      'Four education website page types',
      'Chinese / English content toggle',
      'Dark mode toggle',
      'Local React + Tailwind implementation',
    ],
    nav: ['Learning Services', 'Quality', 'News', 'Admissions', 'Events'],
    home: {
      eyebrow: 'HOME PAGE',
      title: 'Build a warmer learning experience for every student',
      desc:
        'The home page focuses on a wide visual hero, a high-contrast headline, quick entry cards, and structured information modules below.',
      quickLinks: [
        { title: 'Programs', desc: 'Signature courses / Age groups / Learning methods' },
        { title: 'Campus Spaces', desc: 'Learning environments / Classrooms / Support' },
        { title: 'Our Story', desc: 'Mission / Teaching team / Parent feedback' },
        { title: 'Admissions', desc: 'Timelines / Application steps / FAQ' },
      ],
      news: ['Course update 01', 'Campus notice 02', 'Community event 03'],
      highlights: ['Upcoming events', 'Quality', 'Admissions'],
    },
    audit: {
      breadcrumb: 'Home / Quality / Assurance / Learning Quality',
      title: 'Learning Quality',
      desc: 'A formal reading page focused on breadcrumb structure, side navigation, article layout, and readable contrast.',
      menu: ['Overview', 'Teaching Vision', 'Faculty System', 'Learning Quality', 'Student Support'],
      paragraphs: [
        'This page should feel stable, formal, and easy to read.',
        'The side navigation anchors the quality topic while the main article handles paragraphs and bullet points.',
      ],
      bullets: ['Class observation and feedback process', 'Course review and teacher development', 'Student and parent feedback follow-up'],
    },
    careers: {
      breadcrumb: 'Home / Admissions / Admissions Process',
      title: 'Admissions Process',
      desc: 'This page is more visual than the article page. It relies on step rhythm, cards, and support blocks.',
      steps: [
        { title: 'Submit Form', desc: 'Provide student and parent details' },
        { title: 'Needs Review', desc: 'Match age and program needs' },
        { title: 'Trial Session', desc: 'Arrange a trial class or consultation' },
        { title: 'Confirm Enrollment', desc: 'Lock class and schedule' },
        { title: 'Prepare to Start', desc: 'Receive class information' },
      ],
      support: ['FAQ', 'Talk to an advisor', 'View class schedule'],
    },
    research: {
      breadcrumb: 'Home / Events / Collaborations / Programs',
      title: 'Events',
      filters: ['All Events', 'Talks', 'Workshops', 'Past', 'Upcoming'],
      events: [
        {
          title: '2026 Summer Family Learning Festival',
          desc: 'A three-column list showing title, summary, date, and CTA.',
          date: '2026/07/10 - 2026/07/16',
        },
        {
          title: '2026 Teacher Lesson Design Workshop',
          desc: 'The event page should feel more restrained and information-focused.',
          date: '2026/06/14 - 2026/06/18',
        },
        {
          title: '2026 Learning Growth Forum',
          desc: 'This page is about information order, not big visual storytelling.',
          date: '2026/05/26 - 2026/05/29',
        },
      ],
    },
  },
}
