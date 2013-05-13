// リンクの処理開始
function disp(url){
	if(!window.opener || window.opener.closed){ // メインウィンドウの存在をチェック
		window.alert('Page not found'); // 存在しない場合は警告ダイアログを表示
	}
	else{
		window.opener.location.href = url; // 存在する場合はページを切りかえる
		window:parent.close(); // ポップアップ自体を閉じる
	}
}


// リンクの処理終了
