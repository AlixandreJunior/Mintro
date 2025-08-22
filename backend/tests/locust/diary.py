from locust import HttpUser, TaskSet, between, task
import random
import string


def random_string(size=8):
    """Gera uma string aleatória para evitar títulos repetidos"""
    return "".join(random.choices(string.ascii_letters, k=size))


class UserBehavior(TaskSet):
    def on_start(self):
        response = self.client.post(
            "/api/login/", 
            json={"email": "adm@admin.com", "password": "123"}
        )

        self.token = response.json().get("access")
        self.headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}

    @task(3)
    def get_diary_list(self):
        with self.client.get("/api/diary/diary/", headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"Erro ao listar diários: {response.status_code}")

    @task(2)
    def get_diary_with_query(self):
        mood = random.choice(["Excelente", "Bom", "Neutro", "Ruim"])
        with self.client.get(f"/api/diary/diary/?mood={mood}", headers=self.headers, catch_response=True) as response:
            if response.status_code not in [200, 204]:
                response.failure(f"Erro ao filtrar por {mood}: {response.status_code}")

    @task(2)
    def post_diary_create_and_delete(self):
        payload = {
            "title": f"Teste {random_string()}",
            "content": "Conteúdo de teste automático",
            "mood": random.choice(["Excelente", "Bom", "Neutro", "Ruim"]),
        }

        post_response = self.client.post(
            "/api/diary/diary/create/", json=payload, headers=self.headers
        )

        if post_response.status_code == 201:
            diaries = self.client.get("/api/diary/diary/", headers=self.headers).json()
            if diaries:
                diary_id = diaries[-1]["id"]
                self.client.delete(
                    f"/api/diary/diary/detail/{diary_id}/delete/", headers=self.headers
                )

    @task(1)
    def post_diary_and_update(self):
        """Criar e editar diário"""
        payload = {
            "title": f"Update Test {random_string()}",
            "content": "Conteúdo original",
            "mood": "Neutro",
        }

        create_response = self.client.post(
            "/api/diary/diary/create/", json=payload, headers=self.headers
        )

        if create_response.status_code == 201:
            diaries = self.client.get("/api/diary/diary/", headers=self.headers).json()
            if diaries:
                diary_id = diaries[-1]["id"]

                update_payload = {
                    "title": f"Update Test {random_string()}",
                    "content": "Conteúdo atualizado",
                    "mood": "Bom",
                }

                self.client.patch(
                    f"/api/diary/diary/detail/{diary_id}/update/",
                    json=update_payload,
                    headers=self.headers,
                )


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 3)
