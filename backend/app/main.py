from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import users, chilli

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'https://hoppscotch.io'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    )

app.include_router(users.router)
app.include_router(chilli.router)
app.mount('/../chilli_images', StaticFiles(directory='../chilli_images'))
