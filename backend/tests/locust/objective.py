from locust import HttpUser, TaskSet, between, task
import random


class ObjectiveBehavior(TaskSet):
    def on_start(self):
        """Login automático ao iniciar o teste"""
        response = self.client.post(
            "/api/login/", json={"email": "adm@admin.com", "password": "123"}
        )
        self.token = response.json().get("access")
        self.headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}

    @task(2)
    def list_objectives(self):
        """Listar todos os objetivos"""
        self.client.get("/api/diary/objectives/", headers=self.headers)

    @task(1)
    def list_objectives_with_filter(self):
        """Listar objetivos filtrados por status"""
        status_filter = random.choice(["Pendente", "Em Andamento", "Concluído"])
        self.client.get(
            f"/api/diary/objectives/?status={status_filter}", headers=self.headers
        )

    @task(3)
    def create_update_delete_objective(self):
        """Cria, atualiza (PATCH) e exclui um objetivo"""
        payload = {
            "title": "Objetivo de Teste Locust",
            "description": "Criado automaticamente para teste de carga",
            "status": "Pendente",
        }

        # Criar objetivo
        post_response = self.client.post(
            "/api/diary/objectives/create/", json=payload, headers=self.headers
        )

        if post_response.status_code == 201:
            # Buscar lista para pegar o último objetivo
            objectives = self.client.get(
                "/api/diary/objectives/", headers=self.headers
            ).json()
            if objectives:
                last_objective_id = objectives[-1]["id"]

                # Atualizar parcialmente com PATCH
                patch_payload = {"status": "Concluído"}
                self.client.patch(
                    f"/api/diary/objectives/{last_objective_id}/update/",
                    json=patch_payload,
                    headers=self.headers,
                )

                # Excluir para não poluir BD
                self.client.delete(
                    f"/api/diary/objectives/{last_objective_id}/delete/",
                    headers=self.headers,
                )


class WebsiteUser(HttpUser):
    tasks = [ObjectiveBehavior]
    wait_time = between(1, 3)
