const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// ローカルストレージから取得(JSON.parseでオブジェクトの形に戻す)
const todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function(event) {
    // デフォルトのイベント(submit→reload)を無効化するメソッド
    event.preventDefault();
    add();
});

// submitイベント後の挙動(li追加)
function add(todo) {
    let todoText = input.value;

    // ローカルストレージにデータが有るならそれをliに表示
    if(todo) {
        todoText = todo.text;
    }

    // 空文字を追加しない条件
    if(todoText) {
        // li新規作成
        const li = document.createElement("li");
        // li内容＝input.value
        li.innerText = todoText;
        // liにクラス追加(Bootstrap)
        li.classList.add("list-group-item");

        if(todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        // 右クリック→削除機能
        li.addEventListener("contextmenu", function(event) {
            // 右クリック→メニュー出てくるのを防止
            event.preventDefault();
            // liの削除
            li.remove();
            // ローカルストレージの内容を無しとして再定義
            saveData();
        });

        // クリック→打消し線
        li.addEventListener("click", function() {
            // toggle：クラスの切り替え
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        // ulの子要素として追加
        ul.appendChild(li);
        // 入力欄のクリア
        input.value = "";
        saveData();
    }
}

// ローカルストレージへの保存＆表示(reload→deleteの防止)
function saveData() {
    // 全liを取得→listsへ代入(<li>〜</li>の形)
    const lists = document.querySelectorAll("li");
    let todos = [];

    // listsの値をlistへ代入→内容(〜部)とクラスをtodos配列に順次格納
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        }
        todos.push(todo);
    });
    // ローカルストレージへの保存(todos配列をJSON形式(文字列)に変換した上で)
    localStorage.setItem("todos", JSON.stringify(todos));
}