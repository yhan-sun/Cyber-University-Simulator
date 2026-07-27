// Dedicated Strict Event Pool and Anti-Repetition Generator

export function analyzeUniversityTier(name) {
  const cleanName = name.trim();

  const topC9List = ["清华", "北京大学", "北大", "复旦", "上海交通大学", "上海交大", "浙江大学", "浙大", "中国科学技术大学", "中科大", "南京大学", "南大", "哈尔滨工业大学", "哈工大", "西安交通大学", "西安交大", "Cyber Matrix", "赛博黑客"];
  if (topC9List.some(k => cleanName.includes(k))) {
    return {
      tier: "TOP_C9",
      statBonus: { academic: 10, skill: 6, stress: 10 },
      eventsTag: "TIER_TOP"
    };
  }

  const g985List = ["中山大学", "武汉大学", "华中科技大学", "华科", "同济大学", "南开大学", "天津大学", "四川大学", "川大", "电子科技大学", "成电", "厦门大学", "厦大", "吉林大学", "北京航空航天大学", "北航", "北京理工大学", "北理", "西北工业大学", "西工大", "中国人民大学", "人大", "山东大学", "山大", "中南大学", "湖南大学", "重庆大学", "重大", "兰州大学", "大连理工大学", "东南大学", "985"];
  if (g985List.some(k => cleanName.includes(k))) {
    return {
      tier: "TIER_985",
      statBonus: { academic: 8, skill: 5, network: 5 },
      eventsTag: "TIER_985"
    };
  }

  const g211List = ["重庆邮电大学", "重邮", "北京邮电大学", "北邮", "南京邮电大学", "南邮", "西安电子科技大学", "西电", "上海大学", "苏州大学", "暨南大学", "华中师范", "华东师范", "中国政法大学", "西南财经大学", "中南财经政法", "上海财经大学", "北京交通大学", "西南交通大学", "河海大学", "江南大学", "211"];
  if (g211List.some(k => cleanName.includes(k))) {
    return {
      tier: "TIER_211",
      statBonus: { skill: 8, network: 5, wealth: 4 },
      eventsTag: "TIER_211"
    };
  }

  return {
    tier: "REGULAR",
    statBonus: { happiness: 5, stress: -3 },
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

// Strict non-repeating procedural pool
const NATURAL_PROCEDURAL_POOL = [
  {
    templateId: "tpl_library_study",
    category: "CAMPUS_LIFE",
    title: "图书馆的自习座位",
    text: "复习周到了，图书馆的座位非常紧张。你早早来到门口排队，在三楼找到了一处靠窗的位置。",
    choices: [
      { text: "戴上耳机开始复习，安静地看了一整天书", effect: { academic: 10, stress: 5, health: -2 }, log: "你在图书馆安静地复习了一整天。" },
      { text: "复习累了时看看窗外操场上的风景发发呆", effect: { happiness: 8, stress: -4, academic: 4 }, log: "适当放松了心情，复习效率很高。" }
    ]
  },
  {
    templateId: "tpl_evening_run",
    category: "SPORTS_LIFE",
    requireTag: "RUNNER",
    title: "傍晚操场的跑步习惯",
    text: "傍晚阳光微暖，操场跑道上有不少人在散步和跑步。你换好了运动鞋来到跑道前。",
    choices: [
      { text: "按既定节奏跑完 5 公里，汗水带走了整天的疲惫", effect: { health: 12, happiness: 10, stress: -6 }, log: "你在跑道上完成了今天的运动计划。" },
      { text: "拉上同跑的朋友去食堂附近吃个夜宵", effect: { happiness: 10, network: 6, wealth: -3 }, log: "运动完和朋友聊聊天，感觉很放松。" }
    ]
  },
  {
    templateId: "tpl_make_up_exam",
    category: "STUDY_LIFE",
    requireTag: "RECOVER_STUDY",
    title: "补考前夕的复习夜",
    text: "明天就是补考的日子了。宿舍里台灯亮着，你正在仔细整理错题笔记。",
    choices: [
      { text: "把核心公式和例题再梳理一遍，早点休息", effect: { academic: 10, stress: 4 }, log: "准备充分后，你安心地睡了个好觉。" },
      { text: "和同样准备补考的同学交流重点概念", effect: { academic: 8, network: 6 }, log: "和同学交流加深了对概念的理解。" }
    ]
  },
  {
    templateId: "tpl_canteen_dish",
    category: "CAMPUS_LIFE",
    title: "食堂窗口的新品尝鲜",
    text: "中午和室友一起去二食堂吃饭，发现炒菜窗口推出了新品，排队的人不少。",
    choices: [
      { text: "排队买一份尝尝鲜", effect: { happiness: 6, health: 2 }, log: "味道很地道，没有踩雷。" },
      { text: "还是选择平时常吃的那道盖浇饭", effect: { happiness: 4, stress: -2 }, log: "熟悉的口味让你吃得很踏实。" }
    ]
  },
  {
    templateId: "tpl_rainy_day",
    category: "CAMPUS_LIFE",
    title: "突如其来的阵雨",
    text: "下午刚下课，天空突然下起了大雨。教学楼大厅里聚集了不少没带伞的同学。",
    choices: [
      { text: "把伞撑开，邀请顺路的同学一起走", effect: { network: 8, happiness: 6 }, log: "路上聊得很开心，结识了新朋友。" },
      { text: "在大厅坐会儿，等雨势变小再回宿舍", effect: { happiness: 4, stress: -3 }, log: "听着雨声放松了半小时。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = [], usedTemplateIds = []) {
  // Filter out any templates already seen in this session
  const availableTemplates = NATURAL_PROCEDURAL_POOL.filter(t => !usedTemplateIds.includes(t.templateId));
  
  const memoryCandidates = availableTemplates.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else if (availableTemplates.length > 0) {
    const generalPool = availableTemplates.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool.length > 0 ? generalPool[Math.floor(Math.random() * generalPool.length)] : availableTemplates[0];
  } else {
    // Ultimate fallback if all templates exhausted
    selectedTemplate = NATURAL_PROCEDURAL_POOL[index % NATURAL_PROCEDURAL_POOL.length];
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
