<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="container offset-4 my-5 bg-white" id="app">
        <div class="row">
            <div class="col-6 d-flex flex-column">
                <li class="list-group-item active text-center">
                    <span class="h3 mr-2">Chat Room</span>
                <span class="badge badge-pill badge-danger">@{{ numbOfUsers }}</span>
                </li>
                <ul class="list-group overflow-auto" style="max-height: 300px" v-chat-scroll="{always: false, smooth: true}">
                    <message v-for='(message,index) in chat.messages' 
                                :key=message.index :color="chat.colors[index]" 
                                :users="chat.users[index]"
                                :time="chat.time[index]"
                    >
                        @{{ message }}
                    </message>
                    <span class="badge badge-primary w-25" v-show='typing'>Typing...</span>
                </ul>
                <input type="text" placeholder="type your message here" class="form-control" v-model='message' @keyup.enter='send'>

                <button type="submit" class="btn btn-outline-danger btn-sm align-self-center w-50 my-3" @click='clear'>Clear Messages</button>
            </div>
        </div>
    </div>
    
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>