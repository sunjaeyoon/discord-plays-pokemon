# bot.py
import os
import discord
import random
from dotenv import load_dotenv
from gamecommands import press

load_dotenv()
TOKEN = os.getenv('DISCORDJS_BOT_TOKEN')
commands = {'a':'a',
            'b':'b',
            'x':'x', 
            'y':'y',
            'select': 'e', 
            'start':'s',
            'right':'right',
            'left':'left',
            'up':'up',
            'down':'down'}

client = discord.Client()

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    brooklyn_99_quotes = [
        'I\'m the human form of the 💯 emoji.',
        'Bingpot!',
        (
            'Cool. Cool cool cool cool cool cool cool, '
            'no doubt no doubt no doubt no doubt.'
        ),
    ]

    if message.content == '99!':
        response = random.choice(brooklyn_99_quotes)
        await message.channel.send(response)
    
    elif message.content.lower() in commands.keys():
        print("Here")
        #press(commands[message.content.lower()])

    elif message.content == 'raise-exception':
        raise discord.DiscordException
    

client.run(TOKEN)