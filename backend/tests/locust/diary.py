from locust import HttpUser, TaskSet, between, task


class UserBehavior(TaskSet):
    def on_start(self):
        response = self.client.post(
            "/api/login/", json={"email": "adm@admin.com", "password": "123"}
        )
        self.token = response.json().get("access")
        self.headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}

    @task(2)
    def get_diary_list(self):
        self.client.get("/api/diary/diary/", headers=self.headers)

    @task(1)
    def post_diary_create(self):
        payload = {
            "title": "Teste Locust",
            "content": "Conteúdo de teste",
            "mood": "Excelente",
        }
        post_response = self.client.post(
            "/api/diary/diary/create/", json=payload, headers=self.headers
        )

        if post_response.status_code == 201:
            diaries = self.client.get("/api/diary/diary/", headers=self.headers).json()
            if diaries:
                last_diary_id = diaries[-1]["id"]
                self.client.delete(
                    f"/api/diary/diary/delete/?id={last_diary_id}", headers=self.headers
                )


class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 3)
