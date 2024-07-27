import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';

const useFormatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // console.log('Date:', date);
    // console.log('Now:', now);
    // console.log('Difference (seconds):', diffInSeconds);

    // Less than 1 minute
    if (diffInSeconds < 60) {
        return 'just now';
    }

    // Less than 1 hour
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    // Less than 24 hours
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    // Less than 1 year
    if (diffInDays < 365) {
        return format(date, 'MMM dd');
    }

    // More than 1 year
    return format(date, 'MMM dd, yyyy');
};

export default useFormatDate