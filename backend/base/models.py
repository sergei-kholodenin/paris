from django.db import models
from django.contrib.auth.models import User


class Store(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Position(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    second_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=500, blank=True, null=True)
    store = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True, blank=True)
    telephone = models.IntegerField(blank=True, null=True)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.first_name} {self.second_name} {self.last_name}"


class Test(models.Model):
    test = models.CharField(max_length=255, blank=False, null=False)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True, blank=True)
    entry_questions = models.IntegerField(blank=True, null=True, default=1)
    entry_percent = models.IntegerField(blank=True, null=True, default=80)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.test


class Question(models.Model):
    test_id = models.ForeignKey(Test, blank=False, null=False, on_delete=models.CASCADE)
    question = models.TextField(blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.id)


class Variant(models.Model):
    question_id = models.ForeignKey(Question, null=False, blank=False, on_delete=models.CASCADE)
    variant = models.TextField(blank=False, null=False)
    is_right = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.variant


class Result(models.Model):    
    test = models.ForeignKey(Test, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE)
    right_answered = models.IntegerField(blank=False, null=False)
    percent = models.DecimalField(max_digits=3, decimal_places=2,blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.id)


class Answer(models.Model):
    result_id = models.ForeignKey(Result, null=True, on_delete=models.CASCADE)
    question_id = models.IntegerField(blank=False, null=False)
    variant_id = models.IntegerField(blank=False, null=False)
    is_right = models.BooleanField(blank=False, null=False)
    is_right_question = models.BooleanField(blank=False, null=False)
    is_checked = models.BooleanField(blank=False, null=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.is_right)