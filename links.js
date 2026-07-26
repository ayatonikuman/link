// ============================================================
// リンクのデータ。このファイルだけ編集すれば内容が変わります。
// GitHub上で直接編集 → コミット でそのまま公開されます。
//
// 【項目の書き方】
//   title : 表示名(必須)
//   url   : リンク先。"" (空)にすると「準備中」表示になる
//   desc  : 説明文
//   tags  : タグ。上の絞り込みボタンは、ここに書いた分だけ自動で増える
//   image : images/ に入れた画像のファイル名。または画像のURL。
//           "" (空)なら、タイトルに応じたらくがき模様が自動で描かれる
//   color : そのカードだけの色。"" (空)なら共通色。例: "#96b380"
//
// 【追加するとき】
//   下の { ... }, をまるごとコピーして貼り付け、中身を書き換える。
//   カンマ , の付け忘れに注意。並び順がそのまま表示順です。
// ============================================================

const SITE_CONFIG = {
  title: "つくったものまとめ",
  subtitle: "つくったものをここにまとめてます"
};

const SITES = [
  {
    title: "けしかす集中",
    url: "https://ayatonikuman.github.io/keshikasu/",
    desc: "シャーペンと消しゴムと一緒に勉強する集中アプリ。ご褒美は消しカス練り。",
    tags: ["集中アプリ"],
    image: "",
    color: ""
  },
  {
    title: "スマホと移動を同時にこなせ！歩きスマホゲーム",
    url: "https://ayatonikuman.github.io/arukisumaho/",
    desc: "歩行とスマホ操作の2タスク同時処理アクション。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "SNS依存",
    url: "https://ayatonikuman.github.io/SNS/",
    desc: "",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "敵がすっごい避けてくるゲーム、死ぬのがムズい",
    url: "https://ayatonikuman.github.io/sontaku/",
    desc: "こちらに忖度してくる敵。攻めると当たってくれるアクション。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "短歌をつくる",
    url: "https://ayatonikuman.github.io/tanka/",
    desc: "短歌を詠んで書き留める「詠み帖」。",
    tags: ["ツール"],
    image: "",
    color: ""
  },
  {
    title: "構図",
    url: "https://ayatonikuman.github.io/kouzulab/",
    desc: "イラストの構図決め専用のブラウザ3Dツール。パース線・人型モデル付き。",
    tags: ["ツール", "イラスト"],
    image: "",
    color: ""
  },
  {
    title: "化石発掘",
    url: "https://ayatonikuman.github.io/excavationgame/",
    desc: "地層を掘って化石を発掘するパズルゲーム。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "微生物",
    url: "https://ayatonikuman.github.io/microorganismsneba/",
    desc: "単細胞ソフトボディ物理の探索ゲーム。図鑑あり。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "育てる集中アプリ",
    url: "https://ayatonikuman.github.io/focusgarden/",
    desc: "集中した時間だけ植物とカラクリが育つ集中アプリ。",
    tags: ["集中アプリ"],
    image: "",
    color: ""
  },
  {
    title: "惑星迷路",
    url: "https://ayatonikuman.github.io/wakuseimeiro/",
    desc: "小さな星の上をころがって進む迷路。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "音響リアクター",
    url: "",
    desc: "音とタッチに反応するビジュアライザー。3シーン切り替え。",
    tags: ["ツール", "ビジュアル"],
    image: "",
    color: ""
  }

  // ↓ 追加するときはこれを使う(上の行の末尾に , を付けてから貼る)
  // ,{
  //   title: "",
  //   url: "",
  //   desc: "",
  //   tags: [""],
  //   image: "",
  //   color: ""
  // }
];
