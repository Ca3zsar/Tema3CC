from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import psycopg2
from .models import Account

from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
def tweet(request):
    if request.method == 'POST':
        url = request.POST.get("url", "")
        if url == "":
            return HttpResponse("URL empty", status=400)

        response_data = {}
        response_data["message"] = f"Your url is {url}"
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)


@csrf_exempt
def register(request):
    # conn = None
    # try:
    #     conn = psycopg2.connect(
    #         host="127.0.0.1",
    #         port=5433,
    #         database="twitter",
    #         user="db_user",
    #         password="parolaeparola")
    # except (Exception, psycopg2.DatabaseError) as error:
    #     print(error)
    # finally:
    #         if conn is not None:
    #             conn.close()
    #             print('Database connection closed.')

    if request.method == 'POST':
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        email = request.POST.get("email", "")

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


# Create login view
@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")

        if username == "" or password == "":
            return HttpResponse("Fields username and password must exist!", status=400)

        response_data = {}
        response_data["message"] = f"{username} - {password}"
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:
        return HttpResponse("Method not allowed", status=405)
