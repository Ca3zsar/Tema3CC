from django.shortcuts import render
import json

from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def tweet(request):
    if request.method == 'POST':
        url = request.POST.get("url","")
        if url == "":
            return HttpResponse("URL empty", status=400)

        response_data = {}
        response_data["message"] = f"Your url is {url}"
        return HttpResponse(json.dumps(response_data),content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)
