// University Tier Classifier & Custom Treatment Generator

export function analyzeUniversityTier(name) {
  const cleanName = name.trim();

  // Tier 1: Top Ivory League / C9 / 985 Top
  const topKeywords = ["清华", "北京大学", "北大", "复旦", "上海交通大学", "交大", "浙江大学", "浙大", "中国科学技术大学", "中科大", "南京大学", "南大", "哈尔滨工业大学", "哈工大", "西安交通大学", "Cyber Matrix", "赛博黑客"];
  if (topKeywords.some(k => cleanName.includes(k))) {
    return {
      tier: "TOP_C9",
      tierLabel: "🏛️ C9/985 顶级名校",
      badgeColor: "#ff007f",
      description: "科研资源顶尖，企业全线绿灯，但周围全员卷王，竞争压力巨大。",
      statBonus: { academic: 15, skill: 10, stress: 15, happiness: -5, network: 10 },
      eventsTag: "TIER_TOP"
    };
  }

  // Tier 2: 985 / 211 Project Key Universities
  const keyKeywords = ["邮电", "中山大学", "武汉大学", "华中科技", "同济", "南开", "天津大学", "四川大学", "电子科技大学", "成电", "厦门大学", "吉林大学", "理工大学", "科技大学", "工业大学", "农业大学", "师范大学", "985", "211"];
  if (keyKeywords.some(k => cleanName.includes(k))) {
    return {
      tier: "KEY_211",
      tierLabel: "⭐ 985/211 重点大学",
      badgeColor: "#00f0ff",
      description: "行业认可度极高，大厂实习名额充沛，实战工程能力突出。",
      statBonus: { skill: 12, network: 8, wealth: 5, academic: 8 },
      eventsTag: "TIER_KEY"
    };
  }

  // Tier 3: Vocational / Junior College (大专 / 职业学院)
  const vocationalKeywords = ["职业", "专科", "大专", "职业技术", "高等专科", "技师", "职业学院"];
  if (vocationalKeywords.some(k => cleanName.includes(k))) {
    return {
      tier: "VOCATIONAL",
      tierLabel: "🛠️ 职业技术学院 (大专)",
      badgeColor: "#ffaa00",
      description: "接地气的实操技能培训，早早踏入社会锻炼，摆脱了枯燥的纯理论课。",
      statBonus: { skill: 15, happiness: 10, academic: -8, wealth: 8, stress: -8 },
      eventsTag: "TIER_VOCATIONAL"
    };
  }

  // Tier 4: Standard Regular University (普通本科 / 地方院校)
  return {
    tier: "REGULAR_BEN",
    tierLabel: "🏫 普通本科院校",
    badgeColor: "#00ff88",
    description: "环境自由适宜，拥有充分的自我探索时间，靠个人硬实力逆风翻盘。",
    statBonus: { happiness: 8, stress: -5, skill: 5, network: 5 },
    eventsTag: "TIER_REGULAR"
  };
}

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

// Tier-Specific Specialized Events Pool
const TIER_SPECIALIZED_EVENTS = [
  // Top 985 Special Treatment Event
  {
    category: "TIER_TOP",
    requireTag: "TIER_TOP",
    title: "顶级名校专属：国家重点实验室全息算力倾斜",
    text: "凭借你所在 C9/985 顶级名校的学术背景，学院直接为你分配了价值百万的专属算力卡与教授一对一指导机会！",
    choices: [
      { text: "利用顶级算力冲击顶会论文并做课题突破", effect: { academic: 20, skill: 15, stress: 8 }, log: "名校资源光环加持，你的研究成果轰动业内！" },
      { text: "组队带系里学弟学妹拿全国竞赛特等奖", effect: { network: 15, happiness: 12, academic: 10 }, log: "名校大佬光环闪耀全场。" }
    ]
  },

  // Vocational / College Special Treatment Event
  {
    category: "TIER_VOCATIONAL",
    requireTag: "TIER_VOCATIONAL",
    title: "大专实操专属：校企合作与技能大赛入场券",
    text: "虽然没有枯燥的高数理论大课，但学校直通一线企业顶岗实训，并且全省职业技能大赛正在招募选手。",
    choices: [
      { text: "苦练一手不可替代的硬核设备维修/实战编程技术", effect: { skill: 22, wealth: 15, stress: -4 }, log: "比赛斩获一等奖，毕业前夕就被多家知名企业抢先高薪预定！" },
      { text: "利用丰富实战经验早早开启线下兼职创业", effect: { wealth: 20, network: 12, happiness: 10 }, log: "积累了第一桶金，比同龄人更早看清商业社会本质。" }
    ]
  },

  // Key 211 Special Event
  {
    category: "TIER_KEY",
    requireTag: "TIER_KEY",
    title: "985/211 重点大厂校招专场",
    text: "校体育馆举办 985/211 专场招聘会，腾讯、阿里、华为等几十家科技巨头HR直接在现场发绿色通道面试卡！",
    choices: [
      { text: "拿着简历直奔大厂HR专场进行现场快面", effect: { skill: 15, wealth: 15, network: 10 }, log: "凭重点大学学历门槛与扎实工程能力，现场斩获直通卡！" },
      { text: "与学长交流拿到大厂内推专属推荐信", effect: { network: 15, skill: 8 }, log: "利用丰厚的校友资源打通了求职路。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = []) {
  const memoryCandidates = TIER_SPECIALIZED_EVENTS.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0 && Math.random() > 0.4) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else {
    const generalPool = TIER_SPECIALIZED_EVENTS.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool.length > 0 ? generalPool[Math.floor(Math.random() * generalPool.length)] : TIER_SPECIALIZED_EVENTS[0];
  }

  const randomizedId = `tier_${year}_${term}_${index}_${Math.floor(Math.random() * 10000)}`;

  return {
    id: randomizedId,
    year,
    term,
    isDynamic: true,
    title: selectedTemplate.title,
    text: selectedTemplate.text,
    choices: selectedTemplate.choices
  };
}
