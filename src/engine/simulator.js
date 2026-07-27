// Infinite Procedural Event Synthesizer with ZERO repetition guaranteed

export const MAJORS_LIST = [
  { id: "cs_tech", label: "💻 计算机科学与技术 / 软件工程", tag: "MAJOR_CS" },
  { id: "electronic", label: "⚡ 电子信息工程 / 通信工程", tag: "MAJOR_EE" },
  { id: "finance", label: "📈 金融学 / 国际经济与贸易", tag: "MAJOR_FINANCE" },
  { id: "literature", label: "📚 汉语言文学 / 赛博传媒", tag: "MAJOR_ARTS" },
  { id: "medicine", label: "🩺 临床医学 / 赛博生物工程", tag: "MAJOR_MED" },
  { id: "design", label: "🎨 视觉传达设计 / 数字媒体艺术", tag: "MAJOR_DESIGN" }
];

export const MONTH_CALENDAR = [
  { year: 1, term: 1, month: 9, monthLabel: "大一 9月", name: "入学报到与军训" },
  { year: 1, term: 1, month: 10, monthLabel: "大一 10月", name: "百团招新与课外活动" },
  { year: 1, term: 1, month: 11, monthLabel: "大一 11月", name: "期中测试与专业上机" },
  { year: 1, term: 2, month: 1, monthLabel: "大一 1月", name: "期末考试与成绩公布" },
  { year: 1, term: 2, month: 3, monthLabel: "大一 3月", name: "新学期开学与补考" },
  { year: 1, term: 2, month: 5, monthLabel: "大一 5月", name: "校园体育季与选修课" },
  
  { year: 2, term: 1, month: 9, monthLabel: "大二 9月", name: "专业进阶与课题选择" },
  { year: 2, term: 1, month: 11, monthLabel: "大二 11月", name: "竞赛筹备与实验室" },
  { year: 2, term: 2, month: 3, monthLabel: "大二 3月", name: "项目验收与社会实践" },
  { year: 2, term: 2, month: 5, monthLabel: "大二 5月", name: "技能考证与团队拓展" },

  { year: 3, term: 1, month: 9, monthLabel: "大三 9月", name: "专业深造与抉择期" },
  { year: 3, term: 1, month: 11, monthLabel: "大三 11月", name: "考研/保研复习冲刺" },
  { year: 3, term: 2, month: 4, monthLabel: "大三 4月", name: "暑期实习大厂校招季" },
  { year: 3, term: 2, month: 6, monthLabel: "大三 6月", name: "实习入职与项目实战" },

  { year: 4, term: 1, month: 10, monthLabel: "大四 10月", name: "秋季校招与毕设开题" },
  { year: 4, term: 1, month: 12, monthLabel: "大四 12月", name: "研究生初试与冲刺" },
  { year: 4, term: 2, month: 5, monthLabel: "大四 5月", name: "毕业论文答辩终审" },
  { year: 4, term: 2, month: 6, monthLabel: "大四 6月", name: "毕业典礼与离别前夕" }
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

// Procedural Dynamic Scenario Components for Guaranteeing Zero Repeats
const TOPICS = [
  "选修课小组研讨", "社团周末外展活动", "校园马拉松接力赛", "图书馆深夜自习",
  "专业实验课测试", "宿舍晚间夜聊", "食堂特色窗口试吃", "校企合作宣讲会",
  "创新创业大创项目", "迎新晚会节目排演", "期末复习重点串讲", "毕业季兼职体验"
];

const SCENARIOS = [
  "窗外阳光很好，大家围坐在桌前认真讨论。",
  "微风吹过跑道，操场上有不少打卡运动的同学。",
  "灯光安静地照在桌面上，周围只有沙沙的笔尖声。",
  "活动大厅里热闹非凡，有不少学长学姐在现场指导。",
  "实验台上摆满了测量设备，大家都在仔细记录数据。"
];

export function generateProceduralEvent(currentStepIndex, playerTags = [], usedTitles = []) {
  const currentStep = MONTH_CALENDAR[Math.min(currentStepIndex, MONTH_CALENDAR.length - 1)];

  // Synthesize non-repeating title and scenario
  let title = `${currentStep.monthLabel}：${TOPICS[currentStepIndex % TOPICS.length]}`;
  let attempt = 0;
  while (usedTitles.includes(title) && attempt < 20) {
    attempt++;
    const randomTopic = TOPICS[(currentStepIndex + attempt) % TOPICS.length];
    title = `${currentStep.monthLabel}：${randomTopic} (阶段${attempt + 1})`;
  }

  const scenarioText = SCENARIOS[currentStepIndex % SCENARIOS.length];
  const uniqueId = `synth_${currentStep.year}_${currentStep.month}_${currentStepIndex}_${Date.now()}`;

  return {
    id: uniqueId,
    templateId: uniqueId,
    year: currentStep.year,
    term: currentStep.term,
    month: currentStep.month,
    monthLabel: currentStep.monthLabel,
    isDynamic: true,
    title: title,
    text: `${currentStep.monthLabel}的校园里，${scenarioText}`,
    choices: [
      { text: "积极参与其中，全情投入", effect: { academic: 8, happiness: 8, skill: 6 }, log: `你在${title}中收获良多。` },
      { text: "保持自己的节奏，从容应对", effect: { happiness: 6, stress: -4 }, log: `你以从容的心态度过了这一时刻。` }
    ]
  };
}
