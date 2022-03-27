import json
from django.views.decorators.csrf import csrf_exempt
from .models import Account
from django.http import HttpResponse


@csrf_exempt
def login(request):
    if request.method == 'POST':
        response_data = {}
        info = json.loads(request.body)
        username = info.get("username", "")
        password = info.get("password", "")

        if username == "" or password == "":
            return HttpResponse("Fields username and password must exist!", status=400)

        account = Account(username=username, password=password)
        search_user = Account.objects.filter(username=f'{username}')
        if search_user:
            response_data["message"] = f'Successfully log in with user {username}'
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
        else:
            response_data["message"] = f"Wrong username or password"
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
    else:
        return HttpResponse("Method not allowed", status=405)
