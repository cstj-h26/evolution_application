<template>
    <v-container class="stats-participants">

        <v-row>
            <v-col cols="12" md="6">
                <h2 class="text-h5 mb-4"> Repartition des participants par niveau </h2>

                <Bar :data="barChartData" :options="barChartOptions" />
            </v-col>

            <v-col cols="12" md="6">
                <h2 class="text-h5 mb-4"> Participants Actifs vs Inactifs </h2>

                <div style="height: 300px; display: flex; justify-content: center;">
                    <Pie :data="pieChartData" :options="pieChartOptions" />
                </div>
            </v-col>

            <v-col cols="12" md="6">
                <h2 class="text-h5 mb-4"> Corrélation entre Niveau et Actif/Inactif </h2>
                <div style="height: 300px; display: flex; justify-content: center;">
                    <Bar :data="stackedBarChartData" :options="stackedBarChartOptions" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { Bar, Pie } from 'vue-chartjs';
import { computed } from 'vue';
import { useParticipantStore } from '../stores/participantStore';
import {
    Chart as ChartJS,
    BarElement, // pour le Bar Chart
    ArcElement, // pour le Pie Chart
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';


// Enregistrer les composants Chart.js
ChartJS.register(
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const store = useParticipantStore();

// Calcul dynamique: nombre de participants par niveau
const barChartData = computed(() => {
    const niveaux = ['Débutant', 'Intermédiaire', 'Professionnel'];

    const counts = niveaux.map(niveau => {
        return store.participants.filter(p => p.niveau === niveau).length;
    });

    return {
        labels: niveaux,
        datasets: [
            {
                label: 'Nombre de participants',
                data: counts,
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            },
        ],
    };
});

const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        }
    }
};

// Calcul dynamique: nombre de participants actifs vs inactifs
const pieChartData = computed(() => {
    const actifCount = store.participants.filter(p => p.isActif).length;
    const inactifCount = store.participants.length - actifCount;

    const total = store.participants.length || 1; // éviter la division par zéro
    const activePercent = Math.round((actifCount / total) * 100);
    const inactivePercent = Math.round((inactifCount / total) * 100);

    return {
        labels: [`Actifs (${activePercent}%)`, `Inactifs (${inactivePercent}%)`],
        datasets: [
            {
                label: 'Répartition des participants',
                data: [activePercent, inactivePercent],
                backgroundColor: ['#66BB6A', '#EF5350'],
                hoverOffset: 4,
            },
        ],
    };
});

const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'chartArea',
        }
    }
};


// Calcul dynamique: corrélation entre niveau et actif/inactif
const stackedBarChartData = computed(() => {
    const niveaux = ['Débutant', 'Intermédiaire', 'Professionnel'];

    const actifParNiveau = niveaux.map(niveau =>
        store.participants.filter(p => p.niveau === niveau && p.isActif).length
    );

    const inactifParNiveau = niveaux.map(niveau =>
        store.participants.filter(p => p.niveau === niveau && !p.isActif).length
    );

    return {
        labels: niveaux,
        datasets: [
            {
                label: 'Actifs',
                data: actifParNiveau,
                backgroundColor: '#66BB6A',
            },
            {
                label: 'Inactifs',
                data: inactifParNiveau,
                backgroundColor: '#EF5350',
            },
        ]
    }
});

const stackedBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        }
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        }
    }
};

</script>


<style scoped></style>