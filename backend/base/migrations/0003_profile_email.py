# Generated by Django 4.2.1 on 2023-05-06 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_store_profile"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="email",
            field=models.EmailField(blank=True, max_length=500, null=True),
        ),
    ]
