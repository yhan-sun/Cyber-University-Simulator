// Deep Multi-Chain Memory Generator Engine

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
      description: "行业垂直领域统治级存在，大厂实习名额充沛，实操能力极强。",
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

// Expanded Multi-Chain Memory Generators
const DEEP_MEMORY_EVENT_TEMPLATES = [
  // Chain A: Academic Recovery & Post-Graduate
  {
    category: "CHAIN_ACADEMIC",
    requireTag: "RECOVER_STUDY",
    title: "因果回响：补考逆袭与图书馆座位的坚持",
    text: "经过数月的闭关突击，补考成绩公布了！不仅高数高分通过，还吸引了隔壁桌同学的注意。",
    choices: [
      { text: "趁热打铁，将这股狠劲延续到保研/考研中", effect: { academic: 20, stress: 10, happiness: 8 }, tagAdd: "STUDY_GOD", log: "你从挂科低谷逆袭成为了班上的超级学霸！" },
      { text: "邀请隔壁桌一起复习的同学喝咖啡谈心", effect: { love: 18, happiness: 12, network: 8 }, log: "挂科的阴霾散去，你还收获了一段甜甜的校园恋爱。" }
    ]
  },

  // Chain B: CQUPT Redrock Tech Legend Continuation
  {
    category: "CHAIN_REDROCK",
    requireTag: "CQUPT_REDROCK",
    title: "因果回响：重邮红岩网校 20 周年庆典与校友论坛",
    text: "重邮红岩网校迎来了成立 20 周年，众多在硅谷与国内大厂担任 VP/总监的重邮老学长返校举行研讨会。",
    choices: [
      { text: "作为学生代表上台演示你主导开发的校内千万级产品", effect: { skill: 22, network: 20, wealth: 15 }, tagAdd: "CQUPT_TECH_ELITE", log: "老学长们争相向你发出内推最高薪 Offer！" },
      { text: "与学长们深夜烧烤谈心，汲取职场黄金经验", effect: { network: 18, happiness: 12, stress: -5 }, log: "收获了无比珍贵的重邮校友圈人脉与眼界。" }
    ]
  },

  // Chain C: Sports Runner Continuation
  {
    category: "CHAIN_RUNNER",
    requireTag: "RUNNER",
    title: "因果回响：校马拉松队长与全国大学生接力赛",
    text: "因为你长期坚持夜跑打卡，被推举为校跑步队队长，带领团队代表学校参加全国大学生马拉松接力赛！",
    choices: [
      { text: "担纲最后一棒，拼尽全力冲过终点线！", effect: { health: 25, happiness: 20, network: 15 }, tagAdd: "RUN_LEGEND", log: "你率领队伍创造了校历史最好成绩，成为了跑步传奇！" },
      { text: "制定科学训练计划，把团队每个人带到新的完赛高度", effect: { network: 18, health: 18, happiness: 15 }, log: "极强的团队凝聚力赢得了所有跑友的尊敬。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = []) {
  const memoryCandidates = DEEP_MEMORY_EVENT_TEMPLATES.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0 && Math.random() > 0.3) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else {
    const generalPool = DEEP_MEMORY_EVENT_TEMPLATES.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool.length > 0 ? generalPool[Math.floor(Math.random() * generalPool.length)] : DEEP_MEMORY_EVENT_TEMPLATES[0];
  }

  const randomizedId = `deep_${year}_${term}_${index}_${Math.floor(Math.random() * 10000)}`;

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
