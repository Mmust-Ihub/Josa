import json

class JosaException(Exception):
    def __init__(self, message: str, *args: object, **kwargs: dict) -> None:
        super().__init__(*args)
        self.message = message

    def __str__(self) -> str:
        return self.message
