from pytube import YouTube
import sys
import io
from pydub import AudioSegment
import base64
import json

youtube_url = sys.argv[1]

try:
  yt = YouTube(youtube_url)
except:
  print('Connection error')
  sys.exit()

video_track = yt.streams.filter(only_audio = True).order_by('abr').desc().first()

extension = video_track.subtype
bitrate = video_track.abr.replace('kbps', '000')
title = video_track.title + '.mp3'

video_buffer = io.BytesIO()
video_track.stream_to_buffer(video_buffer)
video_buffer.seek(0)

audio = AudioSegment.from_file(video_buffer, format=extension)
audio_buffer = io.BytesIO()
audio.export(audio_buffer, format='mp3', bitrate=bitrate)

audio_base64 = base64.b64encode(audio_buffer.getvalue()).decode('ascii')
audio_src = f'data:audio/mp3;base64,{audio_base64}'

audio_title = f'{video_track.title}.mp3'

new_song = {
  "title": audio_title,
  "src": audio_src
}

print(json.dumps(new_song))

sys.stdout.flush()
