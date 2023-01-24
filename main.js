// プログラムの基本構造
// 「順次進行」「条件分岐」「繰り返し」
// 制御構造と真偽値には密接な関係がある

// なぜターミナル上で「documentが定義されていない」とおこられるのか？
// サーバーサイドでブラウザ用のグローバル変数を使おうとしているため
// documentやwindowはクライアントだけで定義されているグローバル変数
// サーバー環境で動かそうとすると「そんなグローバル変数は定義されていない』とエラーが発生する
// サーバー環境での実行時には無視する設定(デバッグのため)

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

// 開始時間の箱を用意
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

// 時間を表示する関数
function displayTime() {
	// クラスから、クラスのインスタンスであるオブジェクトを作成するためにnew演算子を用いる
	// new Date()の()の中身はクラス定義した際のコンストラクタに渡される
	// コンストラクタとはクラスに対して初期値を与えるイメージ
	// Date.now()はクラスそのものから呼び出しを行う静的メソッド(static)
	const currentTime = new Date(Date.now() - startTime + stopTime);

	// DateクラスのインスタンスcurrentTimeはDateクラスのインスタンスメソッドを使用できる
	// 協定世界時(UTC)の時を取得する
	hours.textContent = String(currentTime.getUTCHours()).padStart(1, "0");
	minutes.textContent = String(currentTime.getUTCMinutes()).padStart(1, "0");
	seconds.textContent = String(currentTime.getUTCSeconds()).padStart(1, "0");
	// 上記と同じ処理ではミリ秒が３桁まで表示されてしまうため
	milliseconds.textContent = currentTime.toISOString().slice(20, 21);

	// グローバルオブジェクトのメソッド　オブジェクトの指定が必要ない
	// displayTimeメソッドを10ミリ秒後に処理する
	// 再帰関数　自分自身を呼び出す関数
	timeoutID = setTimeout(displayTime, 10);
}

// スタートボタンがクリックされたら時間を進める
startButton.addEventListener("click", () => {
	// HTMLSelectElement.disabledは論理値でHTMLのdisabled属性（無効）を反映する
	// trueが無効状態 falseが有効状態 注意すること
	startButton.disabled = true;
	stopButton.disabled = false;
	resetButton.disabled = true;
	// クラスから呼び出す静的メソッド(static)
	// クリックした瞬間の時間を取得
	startTime = Date.now();
	displayTime();
});

// ストップボタンがクリックされたら時間を止める
stopButton.addEventListener("click", function () {
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = false;
	// タイマーを解除するターゲットを示す
	clearTimeout(timeoutID);
	stopTime += Date.now() - startTime;
});

// リセットボタンがクリックされたら時間を0に戻す
resetButton.addEventListener("click", function () {
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = true;
	hours.textContent = "0";
	minutes.textContent = "0";
	seconds.textContent = "0";
	milliseconds.textContent = "0";

	stopTime = 0;
});
