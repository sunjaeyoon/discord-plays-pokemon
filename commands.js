const Discord = require("discord.js");
const path = require("path");
const {spawn} = require("child_process");

const commands = {'a':'x',
                  'b':'z',
                  //'x':'x', 
                  //'y':'y',
                  'select': 'shift', 
                  'start':'enter',
                  'right':'right',
                  'left':'left',
                  'up':'up',
                  'down':'down'}

class Main {
    constructor(bot) {
        this.client = bot;
        this.mode = 'none';
        this.timer_mode = 10 * 60 * 1000; // 30 min * 60 seconds && 1 second = 1000 msec
        this.timer_vote = 100; // A second
        this.reset_vote();

        this.allowed_to_change_mode = true;
        this.allowed_to_run = true;
    }

    reset_vote(){
        this.votes = {
            'down':0,  
            'right': 0 ,
            'select': 0, 
            'start': 0,
            'left': 0,
            'up': 0,
            'b': 0,
            'a': 0
        };
    }
    
    On(){
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
          });
    }

    Com1() {
        this.client.on("message", (msg) => {
            if (msg.author.bot){return}

            //Return a Message
            let words = msg.content.toLowerCase().split(" ");
            switch (words[0]) {
                case `hello`:
                    msg.channel.send(`Hello! ${msg.author} I'm SKYNET I'm new to human world and still observing every action for some amazing stuff I will controll everything in Year 3000 see you in future`);
                    setTimeout(() => {
                        msg.channel.send("Hope You're Having A Great Day ; )");
                    }, 2000);
                    break;
                case `who`:
                    msg.channel.send("Cyber Expert is a good person and a happy software developer as well. He likes people with some different kind of personalities");
                    break;
            }
        });
    }   

    Com2() {
            this.client.on("message", (msg) => {
                if (msg.author.bot){return} //Ignore bot messages
                //console.log(`${msg.username} ${msg.content}`)

                let words = msg.content.toLowerCase().split(" ");
                    
                if (this.mode === "none"){
                    switch(words[0]){
                        case 'a':
                            var process = spawn('python3',["gamecommands.py", commands['a']]);
                            break;
                        case 'b':
                            var process = spawn('python3',["gamecommands.py", commands['b']] );
                            break;
                        case 'up':
                            var process = spawn('python3',["gamecommands.py", commands['up']] );
                            break;
                        case 'down':
                            var process = spawn('python3',["gamecommands.py", commands['down']] );
                            break;
                        case 'left':
                            var process = spawn('python3',["gamecommands.py", commands['left']] );
                            break;
                        case 'right':
                            var process = spawn('python3',["gamecommands.py", commands['right']] );
                            break;
                        case 'start':
                            var process = spawn('python3',["gamecommands.py", commands['start']] );
                            break;
                        case 'select':
                            var process = spawn('python3',["gamecommands.py", commands['select']] );
                            break;
                        case 'democracy':
                        case 'anarchy':
                        case 'none':
                            this.mode = words[0];
                            this.allowed_to_change_mode = false;
                            msg.channel.send(`${this.mode} has been Declared`);
                            
                            setTimeout(() =>{
                                this.allowed_to_change_mode = true;
                                msg.channel.send("Mode Change allowed");
                            }, this.timer_mode);
                            break
                    }
                } else {
                    switch(words[0]){
                        case 'a':
                        case 'b':
                        case 'up':
                        case 'down':
                        case 'left':
                        case 'right':
                        case 'start':
                        case 'select':
                            this.votes[words[0]]++;
                            if (this.allowed_to_run) {
                                this.allowed_to_run = false;
                                setTimeout(() => {
                                    if (this.mode === 'democracy'){    
                                        //msg.channel.send(this.votes);
                                        var popular = Object.keys(this.votes).reduce((a, b) => this.votes[a] > this.votes[b] ? a : b);
                                        msg.channel.send(`pressing ${popular}`)
                                        var process = spawn('python3',["gamecommands.py", commands[popular]] );
                                    } else if (this.mode === 'anarchy'){
                                        //msg.channel.send(this.votes);
                                        var unpopular = Object.keys(this.votes).reduce((a, b) => this.votes[a] < this.votes[b] ? a : b);
                                        msg.channel.send(`pressing ${unpopular}`)
                                        var process = spawn('python3',["gamecommands.py", commands[unpopular]] );
                                    }
                                    this.reset_vote();
                                    this.allowed_to_run = true;
                                }, this.timer_vote);
                            }
                            break;
                        case 'democracy':
                        case 'anarchy':
                        case 'none':    
                            if (this.allowed_to_change_mode){
                                this.mode = words[0];
                                msg.channel.send(`${this.mode} has been Declared`);
                            }
                            break;
                    };
                }  
            }
        );
    };


}

module.exports = {
    Main
};
