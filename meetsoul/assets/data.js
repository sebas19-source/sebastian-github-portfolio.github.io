/* ════════════════════════════════════════════════════════════
   MeetSoul Crystal — shared data
   Bilingual paired strings per brief §8.10 (name_zh / name_en …)
   ⚠️ Replace WA_NUMBER with the real WhatsApp business number.
   ════════════════════════════════════════════════════════════ */

const WA_NUMBER = "60123456789"; // TODO: real MeetSoul WhatsApp number (国际格式, no +)

/* Filter taxonomies (also drive the Shop filter sheet) */
const TAXO = {
  intention: [
    { id:"love",    zh:"爱情·人缘",   en:"Love & Relationships" },
    { id:"wealth",  zh:"财富·事业",   en:"Wealth & Career" },
    { id:"protect", zh:"辟邪·安定",   en:"Protection & Calm" },
    { id:"focus",   zh:"专注·清明",   en:"Focus & Clarity" },
    { id:"comm",    zh:"沟通·自信",   en:"Communication & Confidence" },
  ],
  format: [
    { id:"single", zh:"单一水晶",   en:"Single Stone" },
    { id:"premade",zh:"成品手链",   en:"Pre-made" },
    { id:"couple", zh:"情侣对链",   en:"Couple Sets" },
    { id:"charm",  zh:"朱砂吊饰",   en:"Cinnabar Charms" },
  ],
  size: [
    { id:"6mm",  zh:"6mm 纤细", en:"6mm Delicate" },
    { id:"8mm",  zh:"8mm 日常", en:"8mm Everyday" },
    { id:"10mm", zh:"10mm 存在感", en:"10mm Statement" },
    { id:"12mm", zh:"12mm 大气", en:"12mm Bold" },
  ],
  color: [
    { id:"pink",  zh:"粉色系", en:"Pink" },
    { id:"warm",  zh:"暖金色", en:"Gold / Warm" },
    { id:"black", zh:"黑色系", en:"Black" },
    { id:"clear", zh:"通透白", en:"Clear / White" },
    { id:"blue",  zh:"蓝色系", en:"Blue" },
  ],
  price: [
    { id:"u50",   zh:"RM50 以下",  en:"Under RM50" },
    { id:"50-90", zh:"RM50–90",    en:"RM50–90" },
    { id:"o90",   zh:"RM90 以上",  en:"Over RM90" },
  ],
};

/* Per-bead pricing → pre-calculated TOTAL per size (brief §7).
   total = bead price × bead count, shown so the customer needn't do math. */
const PRODUCTS = [
  {
    id:"rose-quartz", swatch:"s1", intention:"love", format:"single", color:"pink", priceBand:"50-90",
    name_zh:"粉晶手链 · 招桃花", name_en:"Rose Quartz Bracelet",
    tag_zh:"招好人缘", tag_en:"Gentle love luck",
    sub_zh:"天然粉晶 · 柔粉通透", sub_en:"Natural rose quartz · soft translucent pink",
    blurb_zh:"粉晶自古被认为与温柔、人缘相关，常被人们用来寄托对美好关系的期盼。",
    blurb_en:"Rose quartz is traditionally associated with warmth and gentle connection — long worn as a token of hope for kind relationships.",
    sizes:[
      { size:"6mm",  bead:"RM2.8", total:"RM45", desc_zh:"纤细日常", desc_en:"Delicate, everyday" },
      { size:"8mm",  bead:"RM3.6", total:"RM58", desc_zh:"经典百搭", desc_en:"Classic, versatile" },
      { size:"10mm", bead:"RM4.8", total:"RM72", desc_zh:"存在感", desc_en:"Statement" },
    ],
  },
  {
    id:"citrine", swatch:"s2", intention:"wealth", format:"single", color:"warm", priceBand:"50-90",
    name_zh:"黄水晶手链 · 招财", name_en:"Citrine Bracelet",
    tag_zh:"财富事业", tag_en:"Wealth & career",
    sub_zh:"天然黄水晶 · 暖金通透", sub_en:"Natural citrine · warm golden clarity",
    blurb_zh:"黄水晶常与财富、丰盛的寓意联系在一起，是事业与正财能量的传统象征。",
    blurb_en:"Citrine is traditionally associated with abundance and prosperity — a long-standing symbol of career and wealth energy.",
    sizes:[
      { size:"8mm",  bead:"RM4.2", total:"RM68", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM5.5", total:"RM82", desc_zh:"存在感", desc_en:"Statement" },
      { size:"12mm", bead:"RM7.0", total:"RM98", desc_zh:"大气", desc_en:"Bold" },
    ],
  },
  {
    id:"black-obsidian", swatch:"s3", intention:"protect", format:"single", color:"black", priceBand:"u50",
    name_zh:"黑曜石手链 · 辟邪", name_en:"Black Obsidian Bracelet",
    tag_zh:"辟邪安定", tag_en:"Protection & calm",
    sub_zh:"天然黑曜石 · 温润沉稳", sub_en:"Natural obsidian · deep and grounding",
    blurb_zh:"黑曜石在民间传统中常被用作护身、安定心神的象征，沉稳内敛。",
    blurb_en:"In folk tradition, black obsidian has long been worn as a grounding, protective talisman.",
    sizes:[
      { size:"8mm",  bead:"RM2.4", total:"RM38", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM3.2", total:"RM48", desc_zh:"存在感", desc_en:"Statement" },
      { size:"12mm", bead:"RM4.2", total:"RM62", desc_zh:"大气", desc_en:"Bold" },
    ],
  },
  {
    id:"amethyst", swatch:"s4", intention:"focus", format:"single", color:"clear", priceBand:"50-90",
    name_zh:"紫水晶手链 · 清明", name_en:"Amethyst Bracelet",
    tag_zh:"专注清明", tag_en:"Focus & clarity",
    sub_zh:"天然紫水晶 · 通透深邃", sub_en:"Natural amethyst · clear and deep",
    blurb_zh:"紫水晶常与专注、清明的寓意相关，传统上被认为有助于沉静思绪。",
    blurb_en:"Amethyst is traditionally associated with focus and clarity — long believed to support a calm, settled mind.",
    sizes:[
      { size:"6mm",  bead:"RM3.0", total:"RM48", desc_zh:"纤细", desc_en:"Delicate" },
      { size:"8mm",  bead:"RM3.9", total:"RM62", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM5.2", total:"RM78", desc_zh:"存在感", desc_en:"Statement" },
    ],
  },
  {
    id:"aquamarine", swatch:"s1", intention:"comm", format:"single", color:"blue", priceBand:"o90",
    name_zh:"海蓝宝手链 · 沟通", name_en:"Aquamarine Bracelet",
    tag_zh:"沟通自信", tag_en:"Communication",
    sub_zh:"天然海蓝宝 · 清浅海蓝", sub_en:"Natural aquamarine · soft sea blue",
    blurb_zh:"海蓝宝常与表达、沟通的寓意相关，颜色清浅，气质温柔。",
    blurb_en:"Aquamarine is traditionally associated with expression and communication — soft in colour and gentle in feel.",
    sizes:[
      { size:"8mm",  bead:"RM6.5", total:"RM98",  desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM8.5", total:"RM128", desc_zh:"存在感", desc_en:"Statement" },
    ],
  },
  {
    id:"green-aventurine", swatch:"s2", intention:"wealth", format:"single", color:"warm", priceBand:"u50",
    name_zh:"绿东陵手链 · 正财", name_en:"Green Aventurine Bracelet",
    tag_zh:"事业正财", tag_en:"Career luck",
    sub_zh:"天然绿东陵 · 温润草绿", sub_en:"Natural green aventurine · soft green",
    blurb_zh:"绿东陵常与机遇、事业的寓意相关，色泽温润，适合日常配戴。",
    blurb_en:"Green aventurine is traditionally associated with opportunity and career — soft in tone and easy to wear daily.",
    sizes:[
      { size:"8mm",  bead:"RM2.6", total:"RM42", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM3.4", total:"RM52", desc_zh:"存在感", desc_en:"Statement" },
    ],
  },
  {
    id:"couple-rose-obsidian", swatch:"s4", intention:"love", format:"couple", color:"pink", priceBand:"o90",
    name_zh:"情侣对链 · 粉晶 × 黑曜石", name_en:"Couple Set · Rose Quartz × Obsidian",
    tag_zh:"他和她", tag_en:"His & Hers",
    sub_zh:"成对设计 · 粉晶配黑曜石", sub_en:"Matched pair · rose quartz & obsidian",
    blurb_zh:"一柔一稳的成对设计，是情侣之间彼此牵挂的温柔象征。",
    blurb_en:"A soft-and-steady matched pair — a gentle token of two people thinking of each other.",
    sizes:[
      { size:"8mm",  bead:"—", total:"RM118", desc_zh:"一对", desc_en:"Set of two" },
      { size:"10mm", bead:"—", total:"RM148", desc_zh:"一对", desc_en:"Set of two" },
    ],
  },
  {
    id:"cinnabar-charm", swatch:"s1", intention:"protect", format:"charm", color:"pink", priceBand:"50-90",
    name_zh:"朱砂吊饰 · 平安", name_en:"Cinnabar Charm",
    tag_zh:"传统护佑", tag_en:"Traditional charm",
    sub_zh:"朱砂手作 · 民俗护身寓意", sub_en:"Handmade cinnabar · folk protection motif",
    blurb_zh:"朱砂（朱砂）在华人民俗中是常见的护佑象征，承载对平安顺遂的祝愿。",
    blurb_en:"Cinnabar has long appeared in Chinese folk custom as a protective motif, carrying a wish for peace and safe passage.",
    sizes:[
      { size:"标准", bead:"—", total:"RM58", desc_zh:"单件吊饰", desc_en:"Single charm" },
      { size:"加大", bead:"—", total:"RM78", desc_zh:"加大吊饰", desc_en:"Large charm" },
    ],
  },
  {
    id:"tigers-eye", swatch:"s3", intention:"wealth", format:"single", color:"warm", priceBand:"50-90",
    name_zh:"虎眼石手链 · 决断", name_en:"Tiger's Eye Bracelet",
    tag_zh:"魄力正财", tag_en:"Drive & wealth",
    sub_zh:"天然虎眼石 · 金棕光丝", sub_en:"Natural tiger's eye · golden-brown chatoyancy",
    blurb_zh:"虎眼石常与魄力、决断的寓意相关，金棕色光丝流动，气场沉稳。",
    blurb_en:"Tiger's eye is traditionally associated with drive and decisiveness — its golden bands grounding and bold.",
    sizes:[
      { size:"8mm",  bead:"RM3.4", total:"RM54", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM4.5", total:"RM68", desc_zh:"存在感", desc_en:"Statement" },
      { size:"12mm", bead:"RM5.8", total:"RM86", desc_zh:"大气", desc_en:"Bold" },
    ],
  },
  {
    id:"clear-quartz", swatch:"s2", intention:"focus", format:"premade", color:"clear", priceBand:"u50",
    name_zh:"白水晶手链 · 净化", name_en:"Clear Quartz Bracelet",
    tag_zh:"清明净化", tag_en:"Clarity",
    sub_zh:"天然白水晶 · 通透无暇", sub_en:"Natural clear quartz · pure and translucent",
    blurb_zh:"白水晶通透洁净，传统上常被视为清明、净化的象征，百搭耐看。",
    blurb_en:"Clear quartz is pure and translucent — traditionally seen as a symbol of clarity, and endlessly easy to pair.",
    sizes:[
      { size:"6mm",  bead:"RM2.2", total:"RM36", desc_zh:"纤细", desc_en:"Delicate" },
      { size:"8mm",  bead:"RM2.9", total:"RM46", desc_zh:"日常", desc_en:"Everyday" },
    ],
  },
  {
    id:"blue-lace-agate", swatch:"s4", intention:"comm", format:"premade", color:"blue", priceBand:"50-90",
    name_zh:"蓝纹玛瑙手链 · 温和", name_en:"Blue Lace Agate Bracelet",
    tag_zh:"温和沟通", tag_en:"Gentle voice",
    sub_zh:"天然蓝纹玛瑙 · 雾蓝纹理", sub_en:"Natural blue lace agate · misty blue banding",
    blurb_zh:"蓝纹玛瑙色调柔和，常与温和表达、平稳情绪的寓意相关。",
    blurb_en:"Blue lace agate is soft in tone — traditionally associated with gentle expression and steady mood.",
    sizes:[
      { size:"8mm",  bead:"RM3.8", total:"RM60", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM5.0", total:"RM76", desc_zh:"存在感", desc_en:"Statement" },
    ],
  },
  {
    id:"rhodonite", swatch:"s1", intention:"love", format:"premade", color:"pink", priceBand:"50-90",
    name_zh:"红纹石手链 · 暖心", name_en:"Rhodonite Bracelet",
    tag_zh:"温柔疗心", tag_en:"Warm heart",
    sub_zh:"天然红纹石 · 玫粉带纹", sub_en:"Natural rhodonite · rosy pink with veining",
    blurb_zh:"红纹石色泽温暖，常与自我关怀、温柔的人际寓意相关。",
    blurb_en:"Rhodonite is warm in colour — traditionally associated with self-kindness and gentle connection.",
    sizes:[
      { size:"8mm",  bead:"RM3.5", total:"RM56", desc_zh:"日常", desc_en:"Everyday" },
      { size:"10mm", bead:"RM4.6", total:"RM70", desc_zh:"存在感", desc_en:"Statement" },
    ],
  },
];
