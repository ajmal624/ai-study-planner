<<<<<<< HEAD
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "study_api.settings")

=======
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "study_api.settings")

>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
application = get_wsgi_application()