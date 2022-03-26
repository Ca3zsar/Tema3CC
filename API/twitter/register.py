import json
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from django.http import HttpResponse

@csrf_exempt
def register(request):
    if request.method == 'POST':
        info = json.loads(request.body)
        username = info.get("username", "")
        password = info.get("password", "")
        email = info.get("email", "")

        if username == "" or password == "" or email == "":
            return HttpResponse("Fields username, password and email must exist!", status=400)

        try:
            account = Account(username=username, password=password, email=email)
            account.save()
        except Exception as e:
            return HttpResponse(f"Error: {e}", status=400)

        response_data = {}
        response_data["message"] = f"Account successfully created  : {username} - {password} - {email}"
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)
