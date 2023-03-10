# Generated by Django 4.1.7 on 2023-03-09 00:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
        ('athletes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventCompetitor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body_weight', models.FloatField()),
                ('weight_category', models.IntegerField()),
                ('group', models.CharField(max_length=255)),
                ('athlete', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='athletes.athlete')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.event')),
            ],
            options={
                'unique_together': {('event', 'athlete')},
            },
        ),
    ]
