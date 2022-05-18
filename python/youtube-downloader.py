from pytube import YouTube
import sys
from io import BytesIO
import base64
import json

youtube_url = sys.argv[1]

try:
  yt = YouTube(youtube_url)
except:
  print('Connection error')
  sys.exit()

audio_track = yt.streams.filter(only_audio = True, file_extension = 'mp4').order_by('abr').desc().first()

audio_buffer = BytesIO()
audio_track.stream_to_buffer(audio_buffer)
audio_base64 = base64.b64encode(audio_buffer.getvalue()).decode('ascii')
audio_src = f'data:audio/mp3;base64,{audio_base64}'

audio_title = f'{audio_track.title}.mp3'

new_song = {
  "title": audio_title,
  "src": audio_src
}

print(json.dumps(new_song))

sys.stdout.flush()