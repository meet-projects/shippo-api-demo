from django.conf.urls import patterns, include, url

from django.views.generic import TemplateView

from shipping_calc import views
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ShippoAPIExamples.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', views.home, name="home"),
)