interface StravaActivity {
  id: number;
  name: string;
  distance: number; // in meters
  moving_time: number; // in seconds
  type: string;
  start_date: string;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
}

interface StravaStats {
  recent_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  recent_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  ytd_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  ytd_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
}

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken() {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('Using existing token, expires in:', Math.round((tokenExpiry - Date.now()) / 1000), 'seconds');
    return accessToken;
  }

  const client_id = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;
  const refresh_token = process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN;

  console.log('Token refresh attempt with:', {
    client_id: client_id ? 'present' : 'missing',
    client_secret: client_secret ? 'present' : 'missing',
    refresh_token: refresh_token ? 'present' : 'missing'
  });

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Strava credentials not configured');
  }

  try {
    console.log('Making token refresh request to Strava...');
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token refresh failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Token refresh response:', {
      success: !data.error,
      error: data.error,
      has_access_token: !!data.access_token,
      expires_in: data.expires_in,
      scope: data.scope
    });

    if (data.error) {
      throw new Error(data.error);
    }

    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing Strava token:', error);
    throw error;
  }
}

export async function getAthleteStats(athleteId: string) {
  try {
    const access_token = await getAccessToken();
    const response = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch athlete stats');
    }

    return response.json() as Promise<StravaStats>;
  } catch (error) {
    console.error('Error fetching Strava stats:', error);
    throw error;
  }
}

export async function getRecentActivities(perPage: number = 5) {
  try {
    const access_token = await getAccessToken();
    console.log('Fetching recent activities with token:', access_token?.substring(0, 10) + '...');
    
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Strava API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData
      });
      throw new Error(`Failed to fetch recent activities: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched activities:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error;
  }
}

// Helper function to format distance (meters to kilometers)
export function formatDistance(meters: number): string {
  const kilometers = meters / 1000;
  return kilometers.toFixed(1);
}

// Helper function to format duration (seconds to hours and minutes)
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
} 