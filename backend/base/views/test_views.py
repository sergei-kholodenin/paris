from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Test, Result, Answer
from base.serializers import TestSerializer, ResultSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTests(request):
    tests = Test.objects.all()
    serializer = TestSerializer(tests, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTest(request, pk):
    tests = Test.objects.get(id=pk)
    serializer = TestSerializer(tests, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postResult(request):
    user = request.user
    data = request.data
    test = Test.objects.get(id=data['testId'])

    result = Result.objects.create(
        test = test,
        user = user,
        right_answered = data['rightAns'],
        percent = data['percent']
    )
    for i in data['ansArr']:
        Answer.objects.create(
            result_id = result,
            question_id = i['questionId'],
            variant_id = i['variantId'],
            is_right = i['isRight'],
            is_right_question = i['isRightQ'],
            is_checked = i['isChecked']
        )
    return Response("Данные успешно загружены")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getResults(request):
    user = request.user
    result = Result.objects.filter(user=user).order_by('-createdAt')
    serializer = ResultSerializer(result, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getResultById(request, pk):
    result = Result.objects.filter(id=pk)
    serializer = ResultSerializer(result, many=True)
    return Response(serializer.data)


