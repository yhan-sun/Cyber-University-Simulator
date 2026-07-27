// Comprehensive Major Category & Fine-Grained Major List

export const MAJOR_CATEGORIES = [
  {
    categoryName: "💻 工学·计算机与电子信息类",
    majors: [
      { id: "cs_tech", label: "💻 计算机科学与技术", tag: "MAJOR_CS" },
      { id: "soft_eng", label: "🛠️ 软件工程", tag: "MAJOR_CS" },
      { id: "cyber_sec", label: "🛡️ 网络空间安全 / 黑客攻防", tag: "MAJOR_CS" },
      { id: "ai_ds", label: "🤖 人工智能 / 数据科学", tag: "MAJOR_CS" },
      { id: "electronic", label: "⚡ 电子信息工程 / 集成电路", tag: "MAJOR_EE" },
      { id: "comm_eng", label: "📡 通信工程 / 5G网络", tag: "MAJOR_EE" }
    ]
  },
  {
    categoryName: "📊 经管·金融与商业财会类",
    majors: [
      { id: "finance", label: "📈 金融学 / 量化投资", tag: "MAJOR_FINANCE" },
      { id: "econ", label: "🌐 经济学 / 国际经济与贸易", tag: "MAJOR_FINANCE" },
      { id: "accounting", label: "🧾 会计学 / 注册会计师(CPA)", tag: "MAJOR_FINANCE" },
      { id: "bus_mgmt", label: "💼 工商管理 / 市场营销", tag: "MAJOR_FINANCE" }
    ]
  },
  {
    categoryName: "🎨 文艺·传媒与艺术设计类",
    majors: [
      { id: "design", label: "🎨 视觉传达 / 数字媒体艺术", tag: "MAJOR_DESIGN" },
      { id: "media", label: "🎥 新闻传播学 / 赛博自媒体", tag: "MAJOR_ARTS" },
      { id: "chinese_lit", label: "📚 汉语言文学 / 戏剧影视文学", tag: "MAJOR_ARTS" },
      { id: "foreign_lang", label: "🗣️ 英语 / 赛博同声传译", tag: "MAJOR_ARTS" },
      { id: "music_perf", label: "🎸 音乐表演 / 声乐与器乐", tag: "MAJOR_DESIGN" }
    ]
  },
  {
    categoryName: "🩺 理医·医学与理工基础类",
    majors: [
      { id: "medicine", label: "🩺 临床医学 (八年制)", tag: "MAJOR_MED" },
      { id: "pharmacy", label: "💊 药学 / 生物制药", tag: "MAJOR_MED" },
      { id: "math_physics", label: "📐 应用数学 / 理论物理学", tag: "MAJOR_SCI" },
      { id: "architecture", label: "🏛️ 建筑学 / 城市规划", tag: "MAJOR_DESIGN" }
    ]
  },
  {
    categoryName: "⚖️ 法政·法学与公共管理类",
    majors: [
      { id: "law", label: "⚖️ 法学 / 司法考试", tag: "MAJOR_LAW" },
      { id: "pub_admin", label: "🏛️ 行政管理 / 考公方向", tag: "MAJOR_LAW" }
    ]
  }
];

// Flat helper list for backward compatibility
export const MAJORS_LIST = MAJOR_CATEGORIES.flatMap(c => c.majors);

export const INITIAL_STATS = {
  academic: 50,  // 📚 学业
  skill: 50,     // 💻 技能
  wealth: 50,    // 💰 财富
  love: 30,      // ❤️ 爱情
  network: 40,   // 👥 人脉
  happiness: 60, // 😊 快乐
  health: 70,    // 💪 健康
  stress: 20     // 😰 压力
};

// University Tier Classifier
export function analyzeUniversityTier(name) {
  const cleanName = name.trim();

  const topC9List = ["清华", "北京大学", "北大", "复旦", "上海交通大学", "上海交大", "浙江大学", "浙大", "中国科学技术大学", "中科大", "南京大学", "南大", "哈尔滨工业大学", "哈工大", "西安交通大学", "西安交大", "Cyber Matrix", "赛博黑客"];
  if (topC9List.some(k => cleanName.includes(k))) {
    return { tier: "TOP_C9", statBonus: { academic: 10, skill: 6, stress: 10 }, eventsTag: "TIER_TOP" };
  }

  const g985List = ["中山大学", "武汉大学", "华中科技大学", "华科", "同济大学", "南开大学", "天津大学", "四川大学", "川大", "电子科技大学", "成电", "厦门大学", "厦大", "吉林大学", "北京航空航天大学", "北航", "北京理工大学", "北理", "西北工业大学", "西工大", "中国人民大学", "人大", "山东大学", "山大", "中南大学", "湖南大学", "重庆大学", "重大", "兰州大学", "大连理工大学", "东南大学", "985"];
  if (g985List.some(k => cleanName.includes(k))) {
    return { tier: "TIER_985", statBonus: { academic: 8, skill: 5, network: 5 }, eventsTag: "TIER_985" };
  }

  const g211List = ["重庆邮电大学", "重邮", "北京邮电大学", "北邮", "南京邮电大学", "南邮", "西安电子科技大学", "西电", "上海大学", "苏州大学", "暨南大学", "华中师范", "华东师范", "中国政法大学", "西南财经大学", "中南财经政法", "上海财经大学", "北京交通大学", "西南交通大学", "河海大学", "江南大学", "211"];
  if (g211List.some(k => cleanName.includes(k))) {
    return { tier: "TIER_211", statBonus: { skill: 8, network: 5, wealth: 4 }, eventsTag: "TIER_211" };
  }

  return { tier: "REGULAR", statBonus: { happiness: 5, stress: -3 }, eventsTag: "TIER_REGULAR" };
}

// Major-Driven Story Templates Pool for Expanded Majors
const EXPANDED_MAJOR_DRIVEN_TEMPLATES = [
  // Law Major
  {
    templateId: "tpl_law_moot_court",
    category: "MAJOR_LAW",
    requireTag: "MAJOR_LAW",
    title: "法学系：模拟法庭辩论赛",
    text: "模拟法庭里气氛庄严肃穆。作为原告/被告辩护人，你需要就合同争议条款发表代理意见。",
    choices: [
      { text: "引用最新司法解释条文，展开条理清晰的逻辑质证", effect: { academic: 14, skill: 10, stress: 5 }, tagAdd: "LAW_EXPERT", log: "你的辩护意见逻辑严密，赢得了模拟法庭裁判肯定。" },
      { text: "与队友分工合作，准备质证清单与证据链", effect: { network: 10, academic: 8 }, log: "团队配合默契，完成了精彩的辩论。" }
    ]
  },

  // Basic Science (Math & Physics) Major
  {
    templateId: "tpl_sci_quantum_proof",
    category: "MAJOR_SCI",
    requireTag: "MAJOR_SCI",
    title: "数学与物理系：偏微分方程证明",
    text: "草稿纸上写满了复杂算符。老师布置了一道关于偏微分方程解的存在性推导题。",
    choices: [
      { text: "尝试运用泛函分析方法推导极小化序列", effect: { academic: 16, skill: 12, stress: 6 }, tagAdd: "SCI_EXPERT", log: "你做出了漂亮的证明，展现了扎实的数学功底。" },
      { text: "和同桌探讨推导步骤中的逻辑关卡", effect: { academic: 10, network: 8 }, log: "讨论过程中厘清了证明思路。" }
    ]
  },

  // Accounting & CPA Major
  {
    templateId: "tpl_acct_audit_statement",
    category: "MAJOR_FINANCE",
    requireTag: "MAJOR_FINANCE",
    title: "会计系：财务报表分析与审计实训",
    text: "电脑屏幕上密密麻麻全是 Excel 报表数据。你需要从资产负债表中找出异常勾稽关系。",
    choices: [
      { text: "利用数据分析函数快速勾稽，发现隐蔽调整项", effect: { wealth: 12, skill: 14, academic: 8 }, tagAdd: "ACCT_EXPERT", log: "你准确指出了报表异常，实操能力得到了锻炼。" },
      { text: "一步步核对凭证与明细账目", effect: { academic: 8, stress: 3 }, log: "严谨细致地完成了核对工作。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = [], usedTemplateIds = []) {
  const availableTemplates = EXPANDED_MAJOR_DRIVEN_TEMPLATES.filter(t => !usedTemplateIds.includes(t.templateId));
  const memoryCandidates = availableTemplates.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else if (availableTemplates.length > 0) {
    const generalPool = availableTemplates.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool.length > 0 ? generalPool[Math.floor(Math.random() * generalPool.length)] : availableTemplates[0];
  } else {
    selectedTemplate = EXPANDED_MAJOR_DRIVEN_TEMPLATES[index % EXPANDED_MAJOR_DRIVEN_TEMPLATES.length];
  }

  const randomizedId = `${selectedTemplate.templateId}_${year}_${term}_${index}`;

  return {
    id: randomizedId,
    templateId: selectedTemplate.templateId,
    year,
    term,
    isDynamic: true,
    title: selectedTemplate.title,
    text: selectedTemplate.text,
    choices: selectedTemplate.choices
  };
}
