// Granular Multi-Tier University Classification & Specialized Treatment System

export function analyzeUniversityTier(name) {
  const cleanName = name.trim();

  // 1. 🏛️ C9 / 顶尖 985 (Top Ivory League)
  const topC9List = ["清华", "北京大学", "北大", "复旦", "上海交通大学", "上海交大", "浙江大学", "浙大", "中国科学技术大学", "中科大", "南京大学", "南大", "哈尔滨工业大学", "哈工大", "西安交通大学", "西安交大", "Cyber Matrix", "赛博黑客"];
  if (topC9List.some(k => cleanName.includes(k))) {
    return {
      tier: "TOP_C9",
      tierLabel: "👑 C9/顶尖985名校",
      badgeColor: "#ff007f",
      description: "科研资源顶尖，国家重点实验室全线绿灯，全员极客卷王，竞争压力极大。",
      statBonus: { academic: 18, skill: 12, stress: 18, happiness: -6, network: 12 },
      eventsTag: "TIER_C9"
    };
  }

  // 2. 🏛️ 985 工程大学 (985 Universities)
  const g985List = ["中山大学", "武汉大学", "华中科技大学", "华科", "同济大学", "南开大学", "天津大学", "四川大学", "川大", "电子科技大学", "成电", "厦门大学", "厦大", "吉林大学", "北京航空航天大学", "北航", "北京理工大学", "北理", "西北工业大学", "西工大", "中国人民大学", "人大", "山东大学", "山大", "中南大学", "湖南大学", "重庆大学", "重大", "兰州大学", "大连理工大学", "东南大学", "985"];
  if (g985List.some(k => cleanName.includes(k))) {
    return {
      tier: "TIER_985",
      tierLabel: "🏛️ 985工程重点大学",
      badgeColor: "#9d00ff",
      description: "国家重点保研率极高，名企HR直接入驻，拥有极雄厚的校友网络资源。",
      statBonus: { academic: 14, skill: 10, network: 10, stress: 12, wealth: 5 },
      eventsTag: "TIER_985"
    };
  }

  // 3. ⭐ 211 工程大学 (211 Universities)
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

  // 4. 🎨 艺术 / 体育 / 语言特色单科院校 (Art / Sports / Foreign Language Specialty)
  const specialtyList = ["音乐", "美术", "艺术", "体育", "外国语", "传媒", "电影", "戏剧", "舞蹈", "中戏", "北电", "上戏", "国音", "央美", "北外", "上外"];
  if (specialtyList.some(k => cleanName.includes(k))) {
    return {
      tier: "SPECIALTY",
      tierLabel: "🎨 艺术/体育/语言特色高校",
      badgeColor: "#ff3366",
      description: "校园文化多元且浪漫，颜值与艺术氛围拉满，充满无限个人创作灵感。",
      statBonus: { love: 18, happiness: 15, network: 12, academic: -4, stress: -5 },
      eventsTag: "TIER_SPECIALTY"
    };
  }

  // 5. 🌍 赛博海外中外合办 / 留学院校 (Sino-Foreign / Overseas)
  const overseasList = ["纽约大学", "西交利物浦", "宁波诺丁汉", "昆山杜克", "香港", "澳门", "哈佛", "麻省理工", "斯坦福", "剑桥", "牛津", "帝国理工", "海外", "留学"];
  if (overseasList.some(k => cleanName.includes(k))) {
    return {
      tier: "OVERSEAS",
      tierLabel: "🌍 中外合办/赛博海归名校",
      badgeColor: "#ffaa00",
      description: "全英文教学与国际化视野，拥有极其充沛的资本与海外游学资源。",
      statBonus: { wealth: 20, network: 12, happiness: 10, stress: 5, academic: 8 },
      eventsTag: "TIER_OVERSEAS"
    };
  }

  // 6. 🛠️ 职业技术学院 / 专科 (Vocational / College)
  const vocationalList = ["职业", "专科", "大专", "职业技术", "高等专科", "技师", "职业学院", "职高", "技校"];
  if (vocationalList.some(k => cleanName.includes(k))) {
    return {
      tier: "VOCATIONAL",
      tierLabel: "🛠️ 职业技术学院 (大专)",
      badgeColor: "#00ff88",
      description: "接地气的硬核实操技术培训，早早踏入社会实战积累，摆脱枯燥纯理论。",
      statBonus: { skill: 16, happiness: 12, academic: -10, wealth: 10, stress: -10 },
      eventsTag: "TIER_VOCATIONAL"
    };
  }

  // 7. 🏫 普通本科院校 (Standard Regular University)
  return {
    tier: "REGULAR_BEN",
    tierLabel: "🏫 普通本科院校",
    badgeColor: "#64748b",
    description: "环境自由适宜，拥有极大的自我探索空间，全靠个人硬实力逆风翻盘。",
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

// Specialized Event Generators for 7 Granular Tiers
const TIER_SPECIALIZED_EVENTS = [
  // C9 Top Tier Event
  {
    category: "TIER_C9",
    requireTag: "TIER_C9",
    title: "C9 顶尖专属：院士国家课题与百万级算力直通",
    text: "你在 C9 顶尖名校的实验室课题被院士亲自批示，获得了国家高能物理与 AI 大模型专属算力卡！",
    choices: [
      { text: "率队冲刺发表国际顶会论文并做成果转化", effect: { academic: 22, skill: 16, stress: 10 }, log: "C9 光环加持，你的研究轰动国内外科技圈！" },
      { text: "组队带系里学弟学妹包揽全国科技竞赛特等奖", effect: { network: 18, happiness: 14, academic: 10 }, log: "C9 学神称号实至名归。" }
    ]
  },

  // 985 Tier Event
  {
    category: "TIER_985",
    requireTag: "TIER_985",
    title: "985 重点专属：985 保研名额与顶级名企绿色通道",
    text: "大三下学期，学院公布了 985 专属保研名额与顶级大厂 HR 专属面试直通卡！",
    choices: [
      { text: "锁定 985 免试保研直博名额", effect: { academic: 20, stress: 5, network: 10 }, log: "成功锁定 985 直博，未来科研之路一片坦途！" },
      { text: "选择顶级大厂 HR 专属直通卡高薪入职", effect: { wealth: 20, skill: 15, network: 10 }, log: "凭 985 牌子与硬核能力斩获 Sp-Offer！" }
    ]
  },

  // 211 Tier Event
  {
    category: "TIER_211",
    requireTag: "TIER_211",
    title: "211 特色专属：垂直行业巨头专场校招",
    text: "作为垂直领域强校（如IT/邮电/财经/政法），华为、腾讯、中电等行业巨头在学校体育馆举办专场招聘！",
    choices: [
      { text: "拿着简历直奔垂直大厂现场快面", effect: { skill: 18, wealth: 18, network: 12 }, log: "凭 211 垂直领域口碑，当场拿到Offer！" },
      { text: "联系杰出校友学长进行内部推荐", effect: { network: 18, skill: 10 }, log: "庞大的 211 校友帮扶你轻松拿到面试推荐。" }
    ]
  },

  // Art/Sports Specialty Tier Event
  {
    category: "TIER_SPECIALTY",
    requireTag: "TIER_SPECIALTY",
    title: "艺术特色专属：国际先锋艺术展与时尚盛典",
    text: "学院举办赛博时尚艺术周，你的个人创作作品被选为全场封面大作展出！",
    choices: [
      { text: "登台公开发表你的艺术设计理念", effect: { happiness: 22, love: 18, network: 15 }, log: "颜值与才华惊艳全场，粉丝瞬间暴涨！" },
      { text: "与知名艺术机构当场签约合作", effect: { wealth: 20, happiness: 15, love: 10 }, log: "还没毕业就已经成为了知名签约艺术家！" }
    ]
  },

  // Overseas Sino-Foreign Event
  {
    category: "TIER_OVERSEAS",
    requireTag: "TIER_OVERSEAS",
    title: "海归合办专属：硅谷游学与国际风险投资对接",
    text: "学校组织赴硅谷与海外学术中心全额游学，并且国际 VC 机构在校园举办创业大赛。",
    choices: [
      { text: "全英文展示你的国际化项目并获得海外 VC 投资", effect: { wealth: 25, network: 18, academic: 10 }, log: "国际化视野拉满，项目斩获美金投资！" },
      { text: "结识来自全球顶尖名校的跨国青年精英", effect: { network: 22, happiness: 15, wealth: 10 }, log: "建立了极广的国际化人脉网络。" }
    ]
  },

  // Vocational Tier Event
  {
    category: "TIER_VOCATIONAL",
    requireTag: "TIER_VOCATIONAL",
    title: "大专实操专属：校企连线与全国技能大赛冠军",
    text: "学校直接安排一线工厂与大厂实习轮岗，全国职业技能大赛开赛在即。",
    choices: [
      { text: "凭借一身炉火纯青的实操硬核技术斩获冠军", effect: { skill: 25, wealth: 18, stress: -5 }, log: "全国大赛冠军！企业现场高薪争抢签订合同！" },
      { text: "利用丰富实战经验早早开启线下创业店面", effect: { wealth: 22, network: 15, happiness: 12 }, log: "早早实现了财务自由与个人当老板。" }
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
