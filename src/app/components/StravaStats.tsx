"use client";

import { useEffect, useState } from 'react';
import { getAthleteStats, getRecentActivities, formatDistance, formatDuration } from '../../utils/strava';
import { FaRunning, FaBiking } from 'react-icons/fa';

interface ActivityStats {
  distance: number;
  count: number;
  time: number;
}

export default function StravaStats() {
  const [stats, setStats] = useState<{
    recentRuns: ActivityStats;
    recentRides: ActivityStats;
    ytdRuns: ActivityStats;
    ytdRides: ActivityStats;
  } | null>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStravaData() {
      try {
        // Replace with your Strava athlete ID
        const athleteId = process.env.NEXT_PUBLIC_STRAVA_ATHLETE_ID;
        if (!athleteId) {
          throw new Error('Strava athlete ID not configured');
        }

        const [statsData, activitiesData] = await Promise.all([
          getAthleteStats(athleteId),
          getRecentActivities(5)
        ]);

        setStats({
          recentRuns: {
            distance: statsData.recent_run_totals.distance,
            count: statsData.recent_run_totals.count,
            time: statsData.recent_run_totals.moving_time
          },
          recentRides: {
            distance: statsData.recent_ride_totals.distance,
            count: statsData.recent_ride_totals.count,
            time: statsData.recent_ride_totals.moving_time
          },
          ytdRuns: {
            distance: statsData.ytd_run_totals.distance,
            count: statsData.ytd_run_totals.count,
            time: statsData.ytd_run_totals.moving_time
          },
          ytdRides: {
            distance: statsData.ytd_ride_totals.distance,
            count: statsData.ytd_ride_totals.count,
            time: statsData.ytd_ride_totals.moving_time
          }
        });

        setRecentActivities(activitiesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching Strava data:', err);
        setError('Unable to load Strava data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStravaData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 min-h-[120px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-gray-100 rounded-xl p-6 min-h-[120px]">
      <h4 className="font-semibold mb-4">Recent Activity</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaRunning className="text-gray-700" />
            <span className="text-sm text-gray-700">Running</span>
          </div>
          <div className="text-xs text-gray-500">
            <p>Recent: {formatDistance(stats.recentRuns.distance)}km ({stats.recentRuns.count} runs)</p>
            <p>YTD: {formatDistance(stats.ytdRuns.distance)}km ({stats.ytdRuns.count} runs)</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaBiking className="text-gray-700" />
            <span className="text-sm text-gray-700">Cycling</span>
          </div>
          <div className="text-xs text-gray-500">
            <p>Recent: {formatDistance(stats.recentRides.distance)}km ({stats.recentRides.count} rides)</p>
            <p>YTD: {formatDistance(stats.ytdRides.distance)}km ({stats.ytdRides.count} rides)</p>
          </div>
        </div>
      </div>
      {recentActivities.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-medium mb-2">Latest Activities</h5>
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="text-xs text-gray-500">
                <p className="truncate">{activity.name}</p>
                <p>{formatDistance(activity.distance)}km • {formatDuration(activity.moving_time)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 