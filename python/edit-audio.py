from pytube import YouTube
import sys
import io
from pydub import AudioSegment
import base64
import json

title = sys.argv[1]
bitrate = sys.argv[2]
start = int(sys.argv[3]) * 1000
end = int(sys.argv[4]) * 1000

base64audio = input()

audio_buffer = io.BytesIO(base64.b64decode(base64audio))
audio_buffer.seek(0)
audio = AudioSegment.from_mp3(audio_buffer)

new_audio = audio[start:end]
new_audio_buffer = io.BytesIO()
new_audio.export(new_audio_buffer, format='mp3', bitrate=bitrate)

audio_base64 = base64.b64encode(new_audio_buffer.getvalue()).decode('ascii')

new_song = {
  "title": title,
  "base64": audio_base64,
  "duration": new_audio.duration_seconds,
  "bitrate": bitrate
}

print(json.dumps(new_song))

sys.stdout.flush()
