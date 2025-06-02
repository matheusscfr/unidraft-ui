"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ranking = [
  { nome: "João Silva", acertos: 18 },
  { nome: "Maria Souza", acertos: 17 },
  { nome: "Carlos Lima", acertos: 16 },
  { nome: "Ana Paula", acertos: 15 },
  { nome: "Lucas Rocha", acertos: 15 },
  { nome: "Fernanda Alves", acertos: 14 },
  { nome: "Rafael Costa", acertos: 14 },
  { nome: "Juliana Dias", acertos: 13 },
  { nome: "Bruno Martins", acertos: 13 },
  { nome: "Patrícia Melo", acertos: 12 },
  { nome: "Gabriel Pinto", acertos: 12 },
  { nome: "Larissa Ramos", acertos: 11 },
  { nome: "Eduardo Teixeira", acertos: 11 },
  { nome: "Camila Borges", acertos: 10 },
  { nome: "Vinícius Lopes", acertos: 10 },
  { nome: "Beatriz Faria", acertos: 9 },
  { nome: "André Santos", acertos: 9 },
  { nome: "Marina Duarte", acertos: 8 },
  { nome: "Pedro Henrique", acertos: 8 },
  { nome: "Sofia Barros", acertos: 7 },
];

const starColors = [
  "#FFD700", // Ouro
  "#C0C0C0", // Prata
  "#CD7F32", // Bronze
];

export default function RankingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-8 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>
      <h1 className="text-4xl font-bold mb-10 text-primary mt-12">Ranking dos 20 Primeiros</h1>
      <div className="w-full max-w-2xl flex flex-col gap-4 h-[60vh] overflow-y-auto p-4 border rounded-md shadow-inner">
        {ranking.map((user, idx) => (
          <Card key={idx} className="flex items-center justify-between px-8 py-6">
            <CardContent className="flex items-center w-full justify-between p-0">
              <div className="flex items-center gap-4">
                {idx < 3 && (
                  <Star fill={starColors[idx]} color={starColors[idx]} className="w-8 h-8" />
                )}
                <span className="text-xl font-semibold">{idx + 1}º {user.nome}</span>
              </div>
              <span className="text-lg font-medium text-primary">Acertos: {user.acertos}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 