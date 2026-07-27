// Major (Specialty) Definition & Specific Event Pools for Deep Major Correlation

export const MAJORS_LIST = [
  { id: "cs_tech", label: "💻 计算机科学与技术 / 软件工程", tag: "MAJOR_CS" },
  { id: "electronic", label: "⚡ 电子信息工程 / 通信工程", tag: "MAJOR_EE" },
  { id: "finance", label: "📈 金融学 / 国际经济与贸易", tag: "MAJOR_FINANCE" },
  { id: "literature", label: "📚 汉语言文学 / 赛博传媒", tag: "MAJOR_ARTS" },
  { id: "medicine", label: "🩺 临床医学 / 赛博生物工程", tag: "MAJOR_MED" },
  { id: "design", label: "🎨 视觉传达设计 / 数字媒体艺术", tag: "MAJOR_DESIGN" }
];

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

// Major-Driven Story Templates
const MAJOR_DRIVEN_TEMPLATES = [
  // CS & Software Engineering
  {
    templateId: "tpl_cs_lab_debug",
    category: "MAJOR_CS",
    requireTag: "MAJOR_CS",
    title: "数据结构与操作系统实验课",
    text: "机房里键盘敲击声此起彼伏。你负责的操作系统内存分配模块跑出了段错误（Segmentation Fault）。",
    choices: [
      { text: "打开 GDB 调试器逐行追踪指针，定位问题根源", effect: { skill: 14, academic: 8, stress: 5 }, tagAdd: "CS_EXPERT", log: "你定位并修复了指针越界 Bug，对底层原理理解加深。" },
      { text: "向同桌的高手求助，交流解决方案", effect: { skill: 8, network: 8 }, log: "在同桌提醒下顺利完成了实验任务。" }
    ]
  },

  // EE & Electronics Engineering
  {
    templateId: "tpl_ee_circuit_burn",
    category: "MAJOR_EE",
    requireTag: "MAJOR_EE",
    title: "模拟电子技术电路焊接实验",
    text: "实验桌上摆满了烙铁、示波器与电路板。你正在焊接放大电路，示波器波形始终存在严重失真。",
    choices: [
      { text: "调整偏置电阻阻值，重新测绘频率响应曲线", effect: { skill: 14, academic: 8, stress: 4 }, tagAdd: "EE_EXPERT", log: "示波器上出现了完美的正弦波形，实验高分通过。" },
      { text: "检查焊点是否存在虚焊，重新焊接关键节点", effect: { skill: 10, stress: 3 }, log: "重新焊接后电路正常工作。" }
    ]
  },

  // Finance & Economics
  {
    templateId: "tpl_finance_quant_model",
    category: "MAJOR_FINANCE",
    requireTag: "MAJOR_FINANCE",
    title: "计量经济学与量化建模实训",
    text: "全息金融实验终端前，老师布置了利用 Python 测算资本资产定价模型（CAPM）与股票回测的课题。",
    choices: [
      { text: "撰写量化策略脚本，测算最佳资产配置组合", effect: { wealth: 15, skill: 12, academic: 8 }, tagAdd: "FINANCE_EXPERT", log: "策略回测年化收益优秀，受到了专业老师赞赏。" },
      { text: "分析商业案例，撰写研报分析行业走势", effect: { wealth: 10, network: 8, academic: 6 }, log: "研报逻辑清晰，展现了扎实的商业分析基础。" }
    ]
  },

  // Medical Major
  {
    templateId: "tpl_med_anatomy_night",
    category: "MAJOR_MED",
    requireTag: "MAJOR_MED",
    title: "解剖学与生理学深夜备考",
    text: "解剖学期末考前夕，实验室里静悄悄的。你需要背诵记忆人体几百处骨骼与神经肌肉的定位。",
    choices: [
      { text: "对照全息人体模型逐一记忆，熬夜攻克难题", effect: { academic: 16, stress: 10, health: -4 }, tagAdd: "MED_EXPERT", log: "你掌握了全部解剖定位，基础知识无比扎实。" },
      { text: "和组员互相抽背名词解释", effect: { academic: 10, network: 8 }, log: "组员互相鼓励，缓解了备考焦虑。" }
    ]
  },

  // Design & Media Major
  {
    templateId: "tpl_design_portfolio",
    category: "MAJOR_DESIGN",
    requireTag: "MAJOR_DESIGN",
    title: "数字媒体作品集评委审核",
    text: "离视觉设计展提交只剩最后1天，你在渲染器前调整色彩搭配与 UI 动态微交互镜头。",
    choices: [
      { text: "加入赛博朋克极简风视觉与交互细节", effect: { happiness: 15, skill: 14, love: 6 }, tagAdd: "DESIGN_EXPERT", log: "作品集设计极具震撼力，在学院设计展上引发围观。" },
      { text: "采用典雅温暖的插画风格完成叙事", effect: { happiness: 12, love: 10 }, log: "作品呈现出温馨动人的情感关怀。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = [], usedTemplateIds = []) {
  const availableTemplates = MAJOR_DRIVEN_TEMPLATES.filter(t => !usedTemplateIds.includes(t.templateId));
  const memoryCandidates = availableTemplates.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else if (availableTemplates.length > 0) {
    const generalPool = availableTemplates.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool.length > 0 ? generalPool[Math.floor(Math.random() * generalPool.length)] : availableTemplates[0];
  } else {
    selectedTemplate = MAJOR_DRIVEN_TEMPLATES[index % MAJOR_DRIVEN_TEMPLATES.length];
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
