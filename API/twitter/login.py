import json
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from django.http import HttpResponse


@csrf_exempt
def login(request):
    if request.method == 'POST':
        info = json.loads(request.body)
        username = info.get("username", "")
        password = info.get("password", "")

        if username == "" or password == "":
            return HttpResponse("Fields username and password must exist!", status=400)

        response_data = {}
        response_data["message"] = f"{username} - {password}"
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)
