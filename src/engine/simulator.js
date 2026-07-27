// Extended Procedural Pool with Realistic Failures, Sports & Memory Branching

export function analyzeUniversityTier(name) {
  const cleanName = name.trim();

  // 1. 🏛️ C9 / 顶尖 985
  const topC9List = ["清华", "北京大学", "北大", "复旦", "上海交通大学", "上海交大", "浙江大学", "浙大", "中国科学技术大学", "中科大", "南京大学", "南大", "哈尔滨工业大学", "哈工大", "西安交通大学", "西安交大", "Cyber Matrix", "赛博黑客"];
  if (topC9List.some(k => cleanName.includes(k))) {
    return {
      tier: "TOP_C9",
      tierLabel: "👑 C9/顶尖985名校",
      badgeColor: "#ff007f",
      description: "科研资源顶尖，全员极客卷王，但竞争与淘汰压力极其巨大。",
      statBonus: { academic: 18, skill: 12, stress: 18, happiness: -6, network: 12 },
      eventsTag: "TIER_C9"
    };
  }

  // 2. 🏛️ 985 工程大学
  const g985List = ["中山大学", "武汉大学", "华中科技大学", "华科", "同济大学", "南开大学", "天津大学", "四川大学", "川大", "电子科技大学", "成电", "厦门大学", "厦大", "吉林大学", "北京航空航天大学", "北航", "北京理工大学", "北理", "西北工业大学", "西工大", "中国人民大学", "人大", "山东大学", "山大", "中南大学", "湖南大学", "重庆大学", "重大", "兰州大学", "大连理工大学", "东南大学", "985"];
  if (g985List.some(k => cleanName.includes(k))) {
    return {
      tier: "TIER_985",
      tierLabel: "🏛️ 985工程重点大学",
      badgeColor: "#9d00ff",
      description: "国家重点保研率极高，名企HR直接入驻，但考核依然严苛。",
      statBonus: { academic: 14, skill: 10, network: 10, stress: 12, wealth: 5 },
      eventsTag: "TIER_985"
    };
  }

  // 3. ⭐ 211 工程大学
  const g211List = ["重庆邮电大学", "重邮", "北京邮电大学", "北邮", "南京邮电大学", "南邮", "西安电子科技大学", "西电", "上海大学", "苏州大学", "暨南大学", "华中师范", "华东师范", "中国政法大学", "西南财经大学", "中南财经政法", "上海财经大学", "北京交通大学", "西南交通大学", "河海大学", "江南大学", "211"];
  if (g211List.some(k => cleanName.includes(k))) {
    return {
      tier: "TIER_211",
      tierLabel: "⭐ 211工程特色大学",
      badgeColor: "#00f0ff",
      description: "行业垂直领域统治级存在，大厂实习名额充沛，实战工程能力极强。",
      statBonus: { skill: 15, network: 8, wealth: 8, academic: 8, stress: 8 },
      eventsTag: "TIER_211"
    };
  }

  // 4. 🎨 艺术 / 体育 / 语言特色单科院校
  const specialtyList = ["音乐", "美术", "艺术", "体育", "外国语", "传媒", "电影", "戏剧", "舞蹈", "中戏", "北电", "上戏", "国音", "央美", "北外", "上外"];
  if (specialtyList.some(k => cleanName.includes(k))) {
    return {
      tier: "SPECIALTY",
      tierLabel: "🎨 艺术/体育/语言特色高校",
      badgeColor: "#ff3366",
      description: "校园文化多元且浪漫，颜值与体育/艺术氛围拉满。",
      statBonus: { love: 18, happiness: 15, network: 12, academic: -4, stress: -5 },
      eventsTag: "TIER_SPECIALTY"
    };
  }

  // 5. 🌍 赛博海外中外合办
  const overseasList = ["纽约大学", "西交利物浦", "宁波诺丁汉", "昆山杜克", "香港", "澳门", "哈佛", "麻省理工", "斯坦福", "剑桥", "牛津", "帝国理工", "海外", "留学"];
  if (overseasList.some(k => cleanName.includes(k))) {
    return {
      tier: "OVERSEAS",
      tierLabel: "🌍 中外合办/赛博海归名校",
      badgeColor: "#ffaa00",
      description: "全英文教学与国际化视野，资本充沛，但适应成本高。",
      statBonus: { wealth: 20, network: 12, happiness: 10, stress: 5, academic: 8 },
      eventsTag: "TIER_OVERSEAS"
    };
  }

  // 6. 🛠️ 职业技术学院 / 专科
  const vocationalList = ["职业", "专科", "大专", "职业技术", "高等专科", "技师", "职业学院", "职高", "技校"];
  if (vocationalList.some(k => cleanName.includes(k))) {
    return {
      tier: "VOCATIONAL",
      tierLabel: "🛠️ 职业技术学院 (大专)",
      badgeColor: "#00ff88",
      description: "接地气的硬核实操技术培训，早早踏入社会积累实操经验。",
      statBonus: { skill: 16, happiness: 12, academic: -10, wealth: 10, stress: -10 },
      eventsTag: "TIER_VOCATIONAL"
    };
  }

  // 7. 🏫 普通本科院校
  return {
    tier: "REGULAR_BEN",
    tierLabel: "🏫 普通本科院校",
    badgeColor: "#64748b",
    description: "环境自由适宜，拥有极大自我探索空间，靠个人硬实力逆风翻盘。",
    statBonus: { happiness: 8, stress: -5, skill: 6, network: 6 },
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

// Rich procedural pool with sports and realistic failure moments
const PROCEDURAL_EVENT_POOL = [
  // Sports Events
  {
    category: "SPORTS",
    title: "校园新生杯足球赛/篮球赛淘汰赛",
    text: "比赛进入最后伤停补时阶段，比分平手！你在禁区外接到传球，防守队员扑了上来。",
    choices: [
      { text: "起脚远射，轰出一记世界波死角抽射！", effect: { health: 15, happiness: 18, network: 12 }, tagAdd: "SPORTS_HERO", log: "球进了！全场爆发出惊天动地的欢呼，你成为了英雄！" },
      { text: "传给位置更好的队友，可惜队友推射偏出", effect: { health: 10, network: 8, happiness: -4 }, log: "虽然遗憾止步，但大家输得坦坦荡荡。" }
    ]
  },
  {
    category: "SPORTS",
    requireTag: "RUNNER",
    title: "跑团深夜晨跑打卡与体能瓶颈",
    text: "连续一个月凌晨6点去操场刷5公里打卡，今天你的膝盖隐隐作痛，天空还飘着细雨。",
    choices: [
      { text: "咬牙换上跑鞋，戴上耳机继续跑完！", effect: { health: 15, stress: -8, academic: 4 }, tagAdd: "IRON_WILL", log: "突破了体能瓶颈，你的自律感染了跑团里所有人。" },
      { text: "理性暂停休整，去食堂吃个丰盛的早饭", effect: { health: 8, happiness: 10, stress: -5 }, log: "身体得到了充分修养。" }
    ]
  },

  // Realistic Failures & Difficulties
  {
    category: "REALISTIC_FAIL",
    title: "意外重修危机：英语四六级424分险败",
    text: "英语四六级成绩查询页面刷新，你的成绩赫然写着：424分！离425分的合格线仅差可怜的1分！",
    choices: [
      { text: "抱起真题全书，报名单词打卡营死磕下一次！", effect: { academic: 10, stress: 10, happiness: -8 }, tagAdd: "RETRY_ENGLISH", log: "1分的遗憾成为了你狂背词汇的狂热动力。" },
      { text: "破罐子破摔，今天先吃一顿烧烤犒劳自己", effect: { happiness: 10, wealth: -4, academic: -4 }, log: "化悲愤为食欲，明天的事情明天再说。" }
    ]
  },
  {
    category: "REALISTIC_FAIL",
    title: "感情挫折：暗恋对象的告白回应",
    text: "你终于鼓起勇气向暗恋已久的同班同学表达了心意，对方沉默了许久后说：‘你是个好人，但我现在只想专注学习。’",
    choices: [
      { text: "收到‘好人卡’，去操场狂跑10公里发泄情绪", effect: { health: 15, love: -10, happiness: -10, stress: 8 }, tagAdd: "HEART_BROKEN", log: "夜风中的汗水带走了失恋的悲伤，你决定专注提升自我。" },
      { text: "洒脱一笑：‘没关系，那我们就继续当好朋友！’", effect: { network: 8, happiness: -2 }, log: "保持了成熟克制的分寸感。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = []) {
  const memoryCandidates = PROCEDURAL_EVENT_POOL.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0 && Math.random() > 0.3) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else {
    const generalPool = PROCEDURAL_EVENT_POOL.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool.length > 0 ? generalPool[Math.floor(Math.random() * generalPool.length)] : PROCEDURAL_EVENT_POOL[0];
  }

  const randomizedId = `proc_${year}_${term}_${index}_${Math.floor(Math.random() * 10000)}`;

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
