# Generated by Django 4.1.7 on 2023-03-09 00:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
        ('eventcompetitors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('snatch1', models.FloatField()),
                ('snatch2', models.FloatField()),
                ('snatch3', models.FloatField()),
                ('snatch', models.FloatField()),
                ('rank_snatch', models.IntegerField()),
                ('jerk1', models.FloatField()),
                ('jerk2', models.FloatField()),
                ('jerk3', models.FloatField()),
                ('jerk', models.FloatField()),
                ('rank_jerk', models.IntegerField()),
                ('total', models.FloatField()),
                ('rank', models.IntegerField()),
                ('medal', models.CharField(max_length=255)),
                ('note', models.TextField(blank=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.event')),
                ('event_competitor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='eventcompetitors.eventcompetitor')),
            ],
        ),
    ]
