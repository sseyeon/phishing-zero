import React from 'react';
import {View, Text, Image, ScrollView, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapViewContainer from "@/src/components/MapViewContainer";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>보이스피싱 위험지도</Text>

            <View style={styles.mapContainer}>
                <MapViewContainer />
            </View>

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: 'green' }]} />
                    <Text style={styles.legendText}>안전</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: 'orange' }]} />
                    <Text style={styles.legendText}>주의</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: 'red' }]} />
                    <Text style={styles.legendText}>매우 위험</Text>
                </View>
            </View>

            <View style={styles.alertBox}>
                <View style={styles.alertRow}>
                    <Ionicons name="alert-circle" size={18} color="#e63946" />
                    <Text style={styles.alertTextBold}>현재 위치는 ‘매우 위험’ 지역입니다.</Text>
                </View>
                <Text style={styles.alertText}>각별히 주의하세요.</Text>
            </View>

            <View style={styles.reportList}>
                <Text style={styles.reportItem}>3월 30일 | 강남구 역삼동 | 검찰 사칭 피해 발생</Text>
                <Text style={styles.reportItem}>3월 29일 | 송파구 잠실동 | 대출 사기 신고</Text>
                <Text style={styles.reportItem}>3월 27일 | 중구 황학동 | 통장 매입 제안 접수</Text>
            </View>

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>위험 지역 진입 시 알림 받기</Text>
                <Switch value={true} thumbColor="#ffffff" trackColor={{ true: '#1d4ed8' }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    mapContainer: {
        height:300
    },
    mapImage: {
        width: '100%',
        height: 250,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 4,
    },
    legendText: {
        fontSize: 12,
    },
    alertBox: {
        backgroundColor: '#fee2e2',
        borderColor: '#fca5a5',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    alertTextBold: {
        marginLeft: 8,
        fontWeight: '600',
        color: '#b91c1c',
    },
    alertText: {
        fontSize: 13,
        color: '#b91c1c',
    },
    reportList: {
        marginBottom: 16,
    },
    reportItem: {
        fontSize: 13,
        color: '#1f2937',
        marginBottom: 4,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#e5e7eb',
    },
    toggleLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
});
